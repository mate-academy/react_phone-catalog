const URL = `https://mate-academy.github.io/
react_phone-catalog/api/products/`;

export const getProductDetails = async (productId: string) => {
  const result = await fetch(`${URL}${productId}.json`);
  const data = await result.json();

  return data;
};
