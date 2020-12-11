import { MigrationUtils } from '../helpers/MigrationUtils';

export async function migrate(body: any, context) {
  switch (body) {
    case 'up':
      return await MigrationUtils.migrate();
    case 'down':
      return await MigrationUtils.down();
  }
}
