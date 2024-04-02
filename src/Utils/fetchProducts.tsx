export const fetchProducts = async () => {
  const response = await fetch(
    'https://mate-academy.github.io/react_phone-catalog/_new/products.json',
  );
  const data = await response.json();

  return data;
};
