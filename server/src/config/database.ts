require('./config');
import { resolve } from 'path';

const commonSettings = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,
  storage: process.env.DB_STORAGE,
  'migrations-path': resolve(__dirname, '../', 'migrations'),
  logging: () => {},
  define: {
    timestamps: false
  }
};

export default {
  development: {
    ...commonSettings
    // logging: console.log
  }
};
