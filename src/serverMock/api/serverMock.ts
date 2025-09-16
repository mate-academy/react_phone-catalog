import { validate } from '../validation';
import { getService } from '../services';
import { RequestType, Status } from '../types';

const DELAY = 800;

async function getRequest(conf: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  const { request, body } = JSON.parse(conf);

  if (!Object.values(RequestType).some(el => el === request)) {
    return JSON.stringify({
      status: Status.ERROR,
      data: `Invalid request: ${request}`,
    });
  }

  if (!(await validate[request as RequestType](body))) {
    return JSON.stringify({
      status: Status.ERROR,
      data: `Invalid parameters: ${body}`,
    });
  }

  const res = await getService[request as RequestType](body && body);

  return JSON.stringify({
    status: Status.SUCCESS,
    data: res,
  });
}

export { getRequest };
