import type express from 'express';
import { BaseError } from './base';
import { ERROR_CODES } from './lang';
import { config } from '../env';
import { logger } from '../logger';

/**
 * Express middleware factory for handling application errors.
 *
 * This middleware:
 * - Intercepts all thrown or passed errors in the request lifecycle.
 * - If the error is an instance of `BaseError`, it serializes it using `.serialize()`
 *   and responds with the appropriate HTTP status and structured error response.
 * - If it's an unknown error, responds with a generic 400 Bad Request and logs it
 *   only in non-production environments.
 * - Optionally, invokes a provided `callback` with the original error and request context
 *   (useful for custom logging or metrics).
 *
 * @function ErrorHandlerMiddleware
 * @param {function(BaseError, express.Request, express.Response, express.NextFunction): void} [callback]
 *        Optional callback to be invoked when a `BaseError` is caught.
 * @returns {express.ErrorRequestHandler} An Express-compatible error-handling middleware.
 *
 * @example
 * // Basic usage
 * app.use(ErrorHandlerMiddleware());
 *
 * @example
 * // With custom callback
 * app.use(ErrorHandlerMiddleware((error, req, res, next) => {
 *   trackError(error);
 * }));
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