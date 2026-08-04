export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
};
