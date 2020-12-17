import * as winston from 'winston';
import { config } from './index';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: config.appName },
  // transports: [winston.transports.Console],
});
