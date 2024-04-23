'use strict'

import mutex from './src/lock/mutex.js'

import { Make as storageMake, Kind as storageKind } from './src/storage/interface.js'
export const Mutex = mutex
export const MakeStorage = storageMake
export const StorageKind = storageKind
