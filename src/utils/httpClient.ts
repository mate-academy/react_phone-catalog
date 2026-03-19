const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    return handleResponse(response);
  },
};
