/* eslint-disable @typescript-eslint/no-explicit-any */
// ';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function request<T>(path: string): Promise<T> {
  return wait(300)
    .then(() => fetch(path))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json() as Promise<T>;
    });
}
