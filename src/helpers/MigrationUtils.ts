import connection from '../../config/typeorm';

export class MigrationUtils {
  static async migrate(): Promise<void> {
    return new Promise((resolve, reject)  => {
      setTimeout(async () => {
        await connection.runMigrations({
         transaction: 'all',
       });

        await connection.close();

        resolve();
      }, 1000);
    });
  }

  static async down(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await connection.undoLastMigration({
          transaction: 'all',
        });

        await connection.close();

        resolve();
      }, 1000);
    });
  }
}
