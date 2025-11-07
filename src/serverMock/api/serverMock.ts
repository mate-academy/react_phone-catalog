import { validate } from '../validation';

const DELAY = 800;

async function getRequest(conf: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, DELAY));

  const validated = validate(conf);

  return JSON.stringify(validated);
}

export { getRequest };
