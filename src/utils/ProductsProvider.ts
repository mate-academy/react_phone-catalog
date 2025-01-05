'use strict';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request(url: string, method: string) {
  const options: RequestInit = { method };

  return wait(200)
    .then(() => fetch(url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const getClient = {
  get: (url: string) => request(url, 'GET'),
};
