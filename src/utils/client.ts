import { BASE_URL } from './const';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getData = async <T>(url: string): Promise<T> => {
  await wait(500);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
