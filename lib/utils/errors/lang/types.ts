export type IErrorBase = {
    title: string;
    description: string;
    status: string;
    code: string;
  };
  
  export type IErrorExpanded = IErrorBase & Record<string, string | number>;
  