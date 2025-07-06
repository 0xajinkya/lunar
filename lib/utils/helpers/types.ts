import type { IErrorExpanded } from "../errors";

// biome-ignore lint/style/noNamespace: <explanation>
export namespace MonoResponse {
  export interface Query<T> {
    meta: {
      total: number;
      pages: number;
    };
    data: T[];
  }

  export type Content<T, K = Query<T>['meta']> =
    | {
        status: true;
        content: Data<T, K>;
        error?: undefined;
      }
    | {
        status: false;
        error: IErrorExpanded;
        content?: undefined;
      };

  export interface Data<T, K = Query<T>['meta']> {
    data: T;
    meta?: K;
  }

  export interface List<T> {
    status: boolean;
    content: Query<T>;
  }
}
