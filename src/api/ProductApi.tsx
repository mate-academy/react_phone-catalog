const BASE_URL_API = '/api/';

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const getPhonesData = async (url: string) => {
  try {
    await delay(500);

    const response = await fetch(`${BASE_URL_API}${url}`);

    if (!response.ok) {
      throw new Error('Cant get data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
