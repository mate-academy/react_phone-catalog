import { BASE_URL } from '../utils/constants';

export const fetchClient = {
  async getData(fileName: string) {
    const url = `${BASE_URL}/${fileName}.json`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error('Could not retrieve data. Please try again later.');
    }
  },
};
