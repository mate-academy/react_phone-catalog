export function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getDataPublic = async (params: string, delay?: number = 2000) => {
  try {
    const response = await fetch(`/api/${params}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await wait(delay);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`catch error ${error}`);
  }
};
