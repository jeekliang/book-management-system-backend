import { join } from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const config = {
  development: 'dev',
  prod: 'prod'
};

const env = process.env.NODE_ENV || 'development';

export default () => {
  return yaml.load(
    fs.readFileSync(join(__dirname, `./${config[env]}.yml`), 'utf8'),
  );
};
