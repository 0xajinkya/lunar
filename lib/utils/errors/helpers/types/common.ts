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
  