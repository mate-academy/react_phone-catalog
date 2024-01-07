export const BASE_URL
 = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const request = async<T>(
  url: string,
  method: 'GET',
): Promise<T> => {
  await wait(10);

  const response: Response = await fetch(BASE_URL + url, { method });

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
};
