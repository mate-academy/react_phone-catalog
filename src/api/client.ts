const LOCAL_API_URL = import.meta.env.BASE_URL;
const SERVER_API_URL = '';

const API_BASE_URL = SERVER_API_URL || LOCAL_API_URL;

export const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
};
