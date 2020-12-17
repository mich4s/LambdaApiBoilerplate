import { injectable } from 'inversify';
import * as winston from 'winston';
import { config } from '../../config';

@injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: config.appName },
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });
  }

  info(message: string, meta?: any) {
    console.log(message);
    console.log(meta);
    this.logger.info(message, meta);
  }
}
