import type { IErrorExpanded } from "../../errors";

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

export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type Optional<T, K extends keyof T> = Prettify<
  Omit<T, K> & Partial<Pick<T, K>>
>;

export type Mandatory<T, K extends keyof T> = Prettify<
  Pick<T, K> & Partial<Omit<T, K>>
>;

export type RawDocument<T = unknown> = Record<string, T>;

export type Datetime = Date | string;

export type Cookie = {
  name: string;
  value: string;
  options: {
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    domain: string | undefined;
    sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
    signed: boolean;
  };
};

export type Token = string;
