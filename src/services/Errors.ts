import { AppErrors } from '../types/AppErrors';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: AppErrors,
  ) {
    super(code);
  }
}

export class LocalStorageError extends Error {
  constructor(public code: AppErrors) {
    super(code);
  }
}
