import { Context } from '@theinternetfolks/context';
import { BaseError } from './base';
import { ERROR_CODES, type IErrorCode, type IErrorExpanded } from './lang';
import type { ILunarValidationMessage } from '../../validation/types';
import type { RawDocument } from './helpers/types/common';

export class PlatformError extends BaseError {
    details: RawDocument = {};

    http_status = 400;

    code: IErrorCode = '400';

    constructor(
        code: IErrorCode,
        options?: {
            details?: RawDocument & { errors?: ILunarValidationMessage[] };
            http_status?: number;
        }
    ) {
        super(code);

        this.code = code;

        this.details =
            typeof options?.details === 'undefined' ? this.details : options.details;
        this.http_status =
            typeof options?.http_status === 'undefined'
                ? this.http_status
                : options.http_status;

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, PlatformError.prototype);
    }

    serialize(): IErrorExpanded {
        const requestId = Context.get<string>('request_id');
        return {
            ...this.details,
            ...ERROR_CODES[this.code],
            ...(requestId && { 'request-id': requestId })
        };
    }
}
