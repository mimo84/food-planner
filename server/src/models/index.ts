'use strict';

import { readdirSync } from 'fs';
import { basename, join, resolve } from 'path';
import Sequelize from 'sequelize';
import configGeneric from '../config/database';

const bname = basename(__filename);
const env = process.env.DB_ENVIRONMENT;
const config = configGeneric[env];
const db: any = {};

const storage = resolve(__dirname, '../', '../', config.storage);
const confObject = { ...config, storage };

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  confObject
);

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== bname && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
