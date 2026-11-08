export const getProducts = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
};

export const getSuggestedProducts = async (currentProductId?: number) => {
  const products = await getProducts();

  const availableProducts = products.filter(
    product => product.id !== currentProductId,
  );

  const shuffled = [...availableProducts].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 4);
};
