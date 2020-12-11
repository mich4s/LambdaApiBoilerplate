export class PromiseUtils {
  static delay(seconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        return resolve();
      },          seconds * 1000);
    });
  }
}
