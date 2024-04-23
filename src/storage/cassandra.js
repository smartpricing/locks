/**
CREATE KEYSPACE smartlocks WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

create table smartlocks.mutex (
  id text,
  owner text,
  value text,
  s_uuid uuid,
  PRIMARY KEY (id)
);
**/
import { v4 as uuid } from 'uuid'
import cassandra from 'cassandra-driver'
import { CassandraDefaultConfig } from '../config/storage.js'

export function Make (config) {
  const owner = uuid()
  const _config = config === null ? CassandraDefaultConfig : config
  const db = new cassandra.Client(_config)

  return {
    locks: {},

    lock: async function (id, checkMs = null, ttl = 60) {
      const CHECK_INTERVAL_MS = checkMs === null ? 100 : parseInt(checkMs)
      while (true) {
        const res = await db.execute('INSERT INTO mutex (id, owner) VALUES (?,?) IF NOT EXISTS USING TTL ?',
          [id, owner, ttl], { prepare: true, consistency: 'serial' })
        if (res.rows.length === 1 && res.rows[0]['[applied]'] === true) {
          return true
        }
        if (checkMs === 0) {
          return false
        }
        await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL_MS))
      }
    },

    release: async function (id) {
      await db.execute('DELETE FROM mutex WHERE id=? IF owner=?',
        [id, owner], { prepare: true, consistency: 'serial' })
    }
  }
}
