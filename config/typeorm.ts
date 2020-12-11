import { getConnectionManager, ConnectionManager, Connection } from 'typeorm';
import { createUsers1607610403608 } from './migrations/1607610403608-create-users';
import { User } from '../src/models/User';

const connectionManager: ConnectionManager = getConnectionManager();
const connection: Connection = connectionManager.create({
  type: 'sqlite',
  database: 'test.sql',
  synchronize: false,
  logging: 'all',
  entities: [
    User,
  ],
  migrations: [
    // TODO this part needs to be rewritten to use dynamic migration
    createUsers1607610403608,
  ],
});

export default connection;
