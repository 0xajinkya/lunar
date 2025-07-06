import { BaseError } from './base';
import { ERROR_CODES, type IErrorExpanded } from './lang';

export class NotFoundError extends BaseError {
  http_status = 404;

  constructor() {
    super(ERROR_CODES['common.request.NOT_FOUND'].title);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize(): IErrorExpanded {
    return ERROR_CODES['common.request.NOT_FOUND'];
  }
}
