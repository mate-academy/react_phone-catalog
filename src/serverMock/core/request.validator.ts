import { router } from '@server/core/requestRouter';
import { formError } from '../helpers';
import { GetRequests, Methods, PostRequests } from '../types';
import { enumValidator, isValidObject } from '../validation';

export const requestValidator = (string: unknown) => {
  if (typeof string !== 'string' || !JSON.parse(string)) {
    return formError(400, `Expected JSON`);
  }

  const conf = JSON.parse(string);

  if (!isValidObject(conf)) {
    return formError(400, `Expected object`);
  }

  if (!Object.hasOwn(conf, 'method') || !Object.hasOwn(conf, 'request')) {
    return formError(400, `Expected method and request in JSON`);
  }

  let val;

  switch (conf.method) {
    case Methods.GET:
      val = enumValidator(conf.request, Object.values(GetRequests));

      if (!val.ok) {
        return val;
      }

      if (conf.request === GetRequests.BANNER) {
        return { ok: true, data: router[Methods.GET][GetRequests.BANNER] };
      }

      const getExec = router[Methods.GET][
        conf.request as Exclude<GetRequests, GetRequests.BANNER>
      ](conf.body);

      return { ...getExec };
    case Methods.POST:
      val = enumValidator(conf.request, Object.values(PostRequests));

      if (!val.ok) {
        return val;
      }

      return router[conf.method][conf.request as PostRequests](conf.body);
    default:
      return formError(
        400,
        `Expected method ${conf.method} to be one of ${Object.values(Methods)}`,
      );
  }
};
