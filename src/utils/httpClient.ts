const BASE_URL = './api';

// Utility function to create a delay
function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getData<T>(url: string): Promise<T> {
  // delay before fetching data
  await wait(500);

  const response = await fetch(BASE_URL + url + '.json');

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
}
