interface Params {
  [key: string]: string;
}

export interface TypedRequestBody<T> extends Express.Request {
  headers: any;
  body: T;
  params: Params;
}

export interface ErrorMessage {
  attribute: string;
  message: string;
}
