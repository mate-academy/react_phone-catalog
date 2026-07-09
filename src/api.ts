function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts<T>(type: string): Promise<T[]> {
  return wait(1)
    .then(() => fetch(`./api/${type}.json`))
    .then(response => response.json());
}
