import type { ZodIssueCode } from 'zod';

export interface ILunarValidationMessage {
  message: string;
  param: string;
  code: keyof typeof ZodIssueCode;
  path: (string | number)[];
}
