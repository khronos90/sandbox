interface Params {
  [key: string]: string;
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
  params: Params;
}
