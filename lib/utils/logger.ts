import winston from 'winston';
import { config } from './env';

const transports: winston.transport[] = [];

if (config.env === 'test') {
    transports.push(
        new winston.transports.File({
            level: 'debug',
            filename: 'test.log',
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.metadata(),
                winston.format.timestamp(),
                winston.format.cli(),
                winston.format.uncolorize()
            )
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.metadata(),
                winston.format.timestamp(),
                winston.format.cli()
            )
        })
    );
}

/**
 * Application-wide logger instance.
 *
 * This logger adapts its behavior based on the environment:
 * - In `development`, it uses the native `console` for simplicity.
 * - In other environments (e.g., `production`, `staging`), it uses a configured `winston` logger
 *   with transports and metadata for structured logging.
 *
 * Use this logger throughout the app for logging debug info, warnings, and errors.
 *
 * @constant
 * @type {Console | import("winston").Logger}
 *
 * @example
 * logger.debug("Starting service...");
 * logger.error("Something went wrong", error);
 */
export const logger =
    config.env === 'development'
        ? console
        : winston.createLogger({
            level: 'debug',
            defaultMeta: {
                env: config.env
            },
            transports
        });
