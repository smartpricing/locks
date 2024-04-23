'use strict'

import * as Memory from './memory.js'
import * as Redis from './redis.js'
import * as Cassandra from './cassandra.js'
import * as Etcd from './etcd.js'
import * as Postgres from './postgres.js'

export function Make (kind, config = null, id = null) {
  switch (kind) {
    case 'Memory':
      return Memory.Make()

    case 'Redis':
      return Redis.Make(config)

    case 'Postgres':
      return Postgres.Make(config)

    case 'Cassandra':
      return Cassandra.Make(config)

    case 'Etcd':
      return Etcd.Make(config)

    default:
      throw new Error('Unknown storage kind')
  }
}

export const Kind = {
  Memory: 'Memory',
  Redis: 'Redis',
  Cassandra: 'Cassandra',
  Etcd: 'Etcd',
  Postgres: 'Postgres'
}
