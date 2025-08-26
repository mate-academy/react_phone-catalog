function wait(): Promise<void> {
  const delay = 300;

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getData = async <T>(url: string): Promise<T> => {
  await wait();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }

  return response.json();
};
