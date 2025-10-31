import { Methods } from '@server/static';
import { BodyRequestMap, MethodRequestMap } from '.';

interface ValidRequest<M extends Methods> {
  method: M;
  request: MethodRequestMap[M];
  body: BodyRequestMap[MethodRequestMap[M]];
}

export { type ValidRequest };
