import 'express-async-errors';

export default class ApiError extends Error {
  statusCode: number;

  constructor(
    statusCode: number,
    private isOperational: boolean = true,
    message: string,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
