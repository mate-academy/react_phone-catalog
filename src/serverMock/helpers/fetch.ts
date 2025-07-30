import { ApiEndpoint } from '@server/static/endPoints';

export const apiFetch = async (endpoint: ApiEndpoint) => {
  try {
    const response = await window.fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `HTTP Error 501: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};
