export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends Error {
  status: number;

  constructor(status: number, message = 'Server error') {
    super(message);
    this.status = status;
    this.name = 'ServerError';
  }
}
