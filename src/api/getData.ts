function wait(): Promise<void> {
  const delay = 300;

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getData = async <T>(url: string): Promise<T> => {
  await wait();

  const fullUrl = `/${url.replace(/^\/+/, '')}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${fullUrl}`);
  }

  return response.json();
};
