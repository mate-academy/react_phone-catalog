function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request(url: string, method: string) {
  const options: RequestInit = { method };

  return wait(200)
    .then(() => fetch(url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error('something went wrong');
      }

      return response.json();
    });
}

export const client = {
  get: (url: string) => request(url, 'GET'),
};
