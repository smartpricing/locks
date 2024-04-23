'use strict'

import Redis from 'ioredis'
import { RedisDefaultConfig } from '../config/storage.js'

export function Make (config) {
  const db = new Redis(config == null ? RedisDefaultConfig : config)
  return {
    locks: {},

    lock: async function (id, checkMs = null, ttl = 60) {
      const CHECK_INTERVAL_MS = checkMs === null ? 100 : parseInt(checkMs)
      await db.watch(id)
      while (true) {
        let val = await db.get(id)
        if (val === null) {
          val = id
          const mlt = await db.multi()
          await mlt.set(id, val)
          await mlt.expire(id, ttl)
          await mlt.exec()
          return true
        } else {
          if (checkMs === 0) {
            return false
          }
          await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL_MS))
        }
      }
    },

    release: async function (id) {
      await db.del(id)
    }
  }
}
