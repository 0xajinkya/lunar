import { countBy } from 'lodash';

export const ErrorsList = [
  /**
   * 400 - 4XX
   *
   * Common Errors
   */
  {
    status: '400',
    code: 'common.request.BAD_REQUEST',
    title: 'Bad Request',
    description: 'The request is malformed or contains invalid parameters.'
  },
  {
    status: '401',
    code: 'common.request.UNAUTHORIZED',
    title: 'Unauthorized',
    description: 'You are not authorized to access this resource.'
  },
  {
    status: '403',
    code: 'common.request.FORBIDDEN',
    title: 'Forbidden',
    description: 'You do not have permission to access this resource.'
  },
  {
    status: '404',
    code: 'common.request.NOT_FOUND',
    title: 'Resource Not Found',
    description: 'The requested resource could not be found.'
  },
  {
    status: '500',
    code: 'common.request.INTERNAL_SERVER_ERROR',
    title: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.'
  },
  /**
   * 1001 - 1XXX
   * 
   * File Errors
   */
  {
    status: '1001',
    code: 'media.upload.FILE_NOT_ALLOWED',
    title: 'File Not Allowed',
    description: 'The file type is not allowed.'
  },
  {
    status: '1002',
    code: 'media.upload.FILE_TOO_LARGE',
    title: 'File Too Large',
    description: 'The file is too large.'
  },
  {
    status: '1003',
    code: 'media.upload.FILE_NOT_FOUND',
    title: 'File Not Found',
    description: 'The file could not be found.'
  },
  /**
   * 2001 - 2XXX
   */
  {
    status: '2001',
    code: 'generation.generation.ID_NOT_PROVIDED',
    title: 'Generation ID not provided',
    description: 'The generation ID was not provided.'
  }
] as const;

if (
  ErrorsList.map(({ code }) => code).length !==
  new Set(ErrorsList.map(({ code }) => code)).size
) {
  console.error("Duplicate error 'code' found in the list.");
  console.error(
    Object.entries(countBy(ErrorsList, 'code')).filter(([_, v]) => v > 1)
  );
  process.exit(1);
}

if (
  ErrorsList.map(({ status }) => status).length !==
  new Set(ErrorsList.map(({ status }) => status)).size
) {
  console.error("Duplicate error 'status' found in the list.");
  console.error(
    Object.entries(countBy(ErrorsList, 'status')).filter(([_, v]) => v > 1)
  );
  process.exit(1);
}
export type IErrorCode =
  | (typeof ErrorsList)[number]['code']
  | (typeof ErrorsList)[number]['status'];

export const ERROR_CODES = ErrorsList.reduce(
  (acc, error) => {
    acc[error.code] = error;
    acc[error.status] = error;
    return acc;
  },
  {} as Record<IErrorCode, (typeof ErrorsList)[number]>
);

export const ErrorCodesList = ErrorsList.reduce<IErrorCode[]>(
  (previousValue, currentValue) => {
    previousValue.push(currentValue.code);
    previousValue.push(currentValue.status);
    return previousValue;
  },
  [] as IErrorCode[]
);
