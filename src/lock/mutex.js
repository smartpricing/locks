'use strict'

import { MakeStorage } from '../../index.js'

export default function (storageKind, storageConfig) {
  const mutex = {
    _storage: MakeStorage(storageKind, storageConfig)
  }

  mutex.lock = async (id, checkMs = null, ttl = 60) => {
    return await mutex._storage.lock(id, checkMs, ttl)
  }

  mutex.release = async (id) => {
    return await mutex._storage.release(id)
  }

  return mutex
}
