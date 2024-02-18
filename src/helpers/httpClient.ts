// const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';
const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog';

function handleResponce(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const client = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(BASE_URL + url);

    return handleResponce(response);
  },
};
