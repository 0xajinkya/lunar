import type { IErrorExpanded } from "./lang";

export abstract class BaseError extends Error {
  abstract http_status: number;
  abstract serialize(): IErrorExpanded;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
