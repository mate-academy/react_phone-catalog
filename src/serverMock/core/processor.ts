import { requestValidator } from './request.validator';

export function processor(conf: unknown) {
  const service = requestValidator(conf);

  if (!service.ok) {
    return service;
  }

  const result = service.data();

  return result;
}
