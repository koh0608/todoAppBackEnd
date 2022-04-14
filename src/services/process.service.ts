import { NestExpressApplication } from '@nestjs/platform-express';
import logger from './logger.service';

export const terminate = (
  server: NestExpressApplication,
  options = { coredump: false, timeout: 500 }
): ((code: number, reason: string) => (err: Error) => void) => {
  // Exit function
  const exit = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err) => {
    if (err && err instanceof Error) {
      // Log error information, use a proper logging library here :)
      logger.error(`[${code}] (${reason}): ${err.message}, ${err.stack}`);
      console.log(err.message, err.stack);
    }

    // Attempt a graceful shutdown
    server.close();
    setTimeout(exit, options.timeout).unref();
  };
};
