const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  const response = await fetch('./api/products.json');
  const data = await response.json();

  await wait(500);

  return data;
};
