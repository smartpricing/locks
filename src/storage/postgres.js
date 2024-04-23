/**

**/
// import { v4 as uuid } from 'uuid'
import pg from 'pg'
import { PgDefaultConfig } from '../config/storage.js'

const { Client } = pg
export function Make (config) {
  const db = new Client(config == null ? PgDefaultConfig : config)
  db.connect()
  return {
    _db: db,

    db: function () {
      return this._db
    }
  }
}
