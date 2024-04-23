'use strict'

import { Mutex, StorageKind } from '../index.js'

const lockId = 'my-id'
const mtx = await Mutex(StorageKind.Etcd, null)

setTimeout(async () => {
	console.log('Before Acq lock 2')	
	await mtx.lock(lockId)
	console.log('Acq lock 2')	
	await mtx.release(lockId)
	console.log('Release lock 2')
}, 200)

console.log('Before Acq lock 1')	
await mtx.lock(lockId)
console.log('Acq lock 1')
await new Promise(resolve => setTimeout(resolve, 2000))
await mtx.release(lockId)
console.log('Release lock 1')