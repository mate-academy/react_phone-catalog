type ErrorProps = [number, string];
type ValidationSuccess<T> = { ok: true; value: T };
type ValidationError = { ok: false; value: [number, string] };
type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

type ValidationCheck = { ok: true } | ValidationError;

export { type ErrorProps, type ValidationResult, type ValidationCheck };
