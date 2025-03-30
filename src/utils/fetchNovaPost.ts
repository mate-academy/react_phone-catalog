import { wait } from './fetchClient';

const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';
//const API_KEY = '7c47820d0196d60435b8e3db3f0d20a5';
const API_KEY = atob('N2M0NzgyMGQwMTk2ZDYwNDM1YjhlM2RiM2YwZDIwYTU=');

export type RequestMethod = 'GET' | 'POST';

export async function fetchNovaPostData<T>(
  calledMethod: any,
  method: RequestMethod = 'GET',
): Promise<T> {
  const options: RequestInit = { method };

  if (calledMethod) {
    options.body = JSON.stringify({ ...calledMethod, apiKey: API_KEY });
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  await wait(300);
  const response = await fetch(BASE_URL, options);

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Error();
  }

  return response.json();
}
