function wait(): Promise<void> {
  const delay = 300;

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://dejisk.github.io/react_phone-catalog/'
    : '';

export const getData = async <T>(url: string): Promise<T> => {
  await wait();

  const fullUrl = BASE_URL + url;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${fullUrl}`);
  }

  return response.json();
};
