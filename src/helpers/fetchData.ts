export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const fetchData = async <T>(url: string): Promise<T> => {
  await wait(1200);

  const response = await fetch(`${import.meta.env.BASE_URL}${url}`);

  // throw new Error('test error');

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return await response.json();
};
