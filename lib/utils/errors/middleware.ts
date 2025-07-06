import type express from 'express';
import { BaseError } from './base';
import { ERROR_CODES } from './lang';
import { config } from '../env';
import { logger } from '../logger';

/**
 * @description
 * works as an error middleware specific to express requests
 */
export const ErrorHandlerMiddleware =
    (
        callback?: (
            error: BaseError,
            request: express.Request,
            response: express.Response,
            next: express.NextFunction
        ) => void
    ) =>
        (
            error: Error,
            request: express.Request,
            response: express.Response,
            next: express.NextFunction
        ): void => {
            if (error instanceof BaseError) {
                logger.debug(error);

                callback?.(error, request, response, next);

                response
                    .status(error.http_status)
                    .json({ status: false, error: error.serialize() });
                return;
            }

            if (config.env) {
                logger.error(error);
            }

            response.status(400).json({
                status: false,
                error: {
                    ...ERROR_CODES['common.request.BAD_REQUEST'],
                    details: {
                        message: error.message
                    }
                }
            });
        };