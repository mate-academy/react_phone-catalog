const BASE_URL = '/api';

export const fetchData = async (url: string) => {
  function wait(delay: number) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  await wait(1000);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error('');
  }

  return response.json();
};
