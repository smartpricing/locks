'use strict'

export function Make (config) {
  return {
    locks: {},

    lock: async function (id, checkMs = null, ttl = 60) {
      const CHECK_INTERVAL_MS = checkMs === null ? 100 : parseInt(checkMs)
      const currentLock = this.locks[id]
      if (currentLock === undefined || currentLock === null) {
        const timeout = setTimeout(async function () {
          this.locks[id] = null
        }.bind(this), ttl * 1000)
        this.locks[id] = { startlock: new Date(), timeout }
        return true
      } else {
        if (checkMs === 0) {
          return false
        }
        while (this.locks[id] !== null) {
          await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL_MS))
        }
        this.locks[id] = { startlock: new Date() }
      }
    },

    release: async function (id) {
      try {
        if (this.locks[id] !== undefined) {
          clearTimeout(this.locks[id].timeout)
        }
      } catch (err) {}
      this.locks[id] = null
    }
  }
}
