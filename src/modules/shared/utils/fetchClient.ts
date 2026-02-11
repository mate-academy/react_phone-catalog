function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts<T>(path: string): Promise<T> {
  return wait(500)
    .then(() => fetch(path))
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    });
}
