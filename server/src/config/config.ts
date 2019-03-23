import { readFileSync } from 'fs';
import { resolve } from 'path';

import * as dotenv from 'dotenv';
import { defaults } from 'lodash';

// default environment to be develpment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.parse(
  readFileSync(resolve(__dirname, '../', '../', `${process.env.NODE_ENV}.env`))
);
// adds the variable under process.env
defaults(process.env, env);
