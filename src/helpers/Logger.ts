import { injectable } from 'inversify';
import { logger } from '../../config/logger';

@injectable()
export class Logger {
  info(message: string, meta?: any) {
    logger.info(message, meta);
  }
}
