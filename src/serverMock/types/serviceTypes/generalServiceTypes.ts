import { ErrorObject, Status } from '..';

// eslint-disable-next-line max-len, prettier/prettier
type ServiceResult<T> = { status: Status.SUCCESS; data: T } | ErrorObject;

export { type ServiceResult };
