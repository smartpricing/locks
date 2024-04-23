# Smart Locks

Locking and optimistic locking built over Memory, Redis, Cassandra and Etcd.

## Storage

```js
import { StorageKind } from 'smartlocks'
await Mutex(StorageKind.Memory, null)
await Mutex(StorageKind.Redis, null)
await Mutex(StorageKind.Cassandra, null)
await Mutex(StorageKind.Etcd, null)
```

## Mutex

```js
lock(lockId, checkMs = null, ttl = 60) // checkMs in milliseconds, ttl in seconds
release(lockId)
```

```js
import { Mutex, StorageKind } from 'smartlocks'

const lockId = 'my-id'
const mtx = await Mutex(StorageKind.Memory, null)
await mtx.lock(lockId) // Default check every 100 ms
await mtx.release(lockId)

await mtx.lock(lockId, 1000) // Check every 1000 ms if lock is released
await mtx.release(lockId)

await mtx.lock(lockId, 0) // Acquire or return false, do not try to acquire again
await mtx.release(lockId)

await mtx.lock(lockId, 100, 2) // Acquire and check every 100ms, max lease 2 seconds
await mtx.release(lockId)
```
