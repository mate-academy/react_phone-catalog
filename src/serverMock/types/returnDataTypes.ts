enum Status {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ErrorObject {
  status: Status.ERROR;
  statusCode: number;
  error: string;
  message: string;
}

export { type ErrorObject, Status };
