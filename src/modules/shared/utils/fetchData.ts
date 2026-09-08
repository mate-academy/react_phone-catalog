const wait = (ms: number) => new Promise(response => setTimeout(response, ms));

export async function fetchData(path: string) {
  try {
    await wait(1500);

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
