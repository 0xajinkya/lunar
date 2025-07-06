import { ErrorHandlerMiddleware } from './middleware';
import { NotFoundError } from './not-found';
import { PlatformError } from './platform';

export * from './lang';
export * from './base';

export const LunarError = {
  NotFound: NotFoundError,
  Platform: PlatformError,
  Middleware: ErrorHandlerMiddleware
};
