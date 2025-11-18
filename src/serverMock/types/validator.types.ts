import { ErrorObject } from './entities/entities.types';

type ValidatorResponce = { ok: true } | { ok: false; error: ErrorObject };

type ProcessingResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ErrorObject };

export { type ValidatorResponce, type ProcessingResult };
