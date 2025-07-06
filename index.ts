import { config } from "./lib/utils/env";
import { logger } from "./lib/utils/logger";
import { createServer } from "./server";

(async () => {
    console.log('Creating app');
    const app = await createServer();
    console.log('Created app');
    app.listen(config.port, () => {
        logger.debug(`🚀 Started the platform server on port ${config.port}`);
    });
})().catch((error) => logger.error(error));

process.on('SIGTERM', (signal) => {
    logger.debug(signal);
    logger.debug(`process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
});

process.on('SIGINT', (signal) => {
    logger.debug(signal);
    logger.debug(`process ${process.pid} has been interrupted`);
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    logger.error(err);
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});