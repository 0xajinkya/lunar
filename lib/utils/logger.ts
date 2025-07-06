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
