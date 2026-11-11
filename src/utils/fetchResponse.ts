const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const request = async <T>(url: string): Promise<T> => {
  await delay(500);

  const response = await fetch(`${import.meta.env.BASE_URL}api${url}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
