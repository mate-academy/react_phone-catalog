import { processor } from '@server/core/processor';

const DELAY = 800;

async function getRequest(conf: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, DELAY));

  return JSON.stringify(processor(conf));
}

export { getRequest };
