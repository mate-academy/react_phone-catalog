// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

async function request<T>(
  url: string,
): Promise<T> {
  const response = await fetch(BASE_URL + url);

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
