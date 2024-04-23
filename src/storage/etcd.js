'use strict'

import { Etcd3 } from 'etcd3'

export function Make (config, id) {
  const db = config == null ? new Etcd3() : new Etcd3(config)
  const lockMap = {}
  return {
    _db: db,
    state: {},
    _id: id,

    db: async function () {
      return this.db
    },

    lock: async function (lockKey, checkMs = null) {
      const CHECK_INTERVAL_MS = checkMs === null ? 100 : parseInt(checkMs)
      while (true) {
        try {
          lockMap[lockKey] = await db.lock(lockKey).acquire()
          return true
        } catch (error) {
          if (checkMs === 0) {
            return false
          }
          await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL_MS))
        }
      }
    },

    release: async function (lockKey) {
      try {
        if (lockMap[lockKey] === undefined) {
          return true
        }
        await lockMap[lockKey].release()
        return true
      } catch (error) {
        return false
      }
    }
  }
}
