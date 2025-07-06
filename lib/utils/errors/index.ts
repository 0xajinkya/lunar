import { ErrorHandlerMiddleware } from './middleware';
import { NotFoundError } from './not-found';
import { PlatformError } from './platform';

export * from './lang';
export * from './base';

export const LunarError = {
  /**
   * Custom error class representing a 404 Not Found HTTP error.
   *
   * This is typically thrown when a requested route, resource, or entity is not found.
   * Extends the `BaseError` class and returns a standardized error response from the error code map.
   *
   * @class NotFoundError
   * @extends BaseError
   *
   * @property {number} http_status - HTTP status code (404).
   *
   * @example
   * throw new LunarError.NotFound(); 
   */
  NotFound: NotFoundError,

  /**
   * Represents a platform-level error used for user-facing or client-side issues (e.g., bad input, invalid state).
   *
   * Extends the base application error with:
   * - Custom HTTP status codes (default: 400)
   * - Optional `details` (e.g., validation errors)
   * - A structured error code from the global `ERROR_CODES` map
   * - A contextual `request-id` for traceability, if available
   *
   * Typically thrown for domain or validation failures in application logic.
   *
   * @class PlatformError
   * @extends BaseError
   *
   * @property {number} http_status - HTTP status code to be returned (default: 400).
   * @property {IErrorCode} code - The unique application-level error code.
   * @property {RawDocument} details - Optional contextual metadata or validation messages.
   *
   * @example
   * throw new PlatformError('common.validation.INVALID_INPUT', {
   *   details: { errors: [{ field: 'email', message: 'Invalid email address' }] }
   * });
   */
  Platform: PlatformError,
  Middleware: ErrorHandlerMiddleware
};
