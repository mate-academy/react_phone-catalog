export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json() as Promise<T>;
  }

  throw new Error(`Error ${response.status}`);
};
