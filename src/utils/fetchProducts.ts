import { Product, ItemCard } from '../constants/common';

export const fetchProducts = async (
  category?: string,
  product?: string,
): Promise<Product[] | ItemCard | null> => {
  try {
    if (!product) {
      const response = await fetch(`./api/products.json`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products catalog`);
      }

      const allProducts: Product[] = await response.json();

      return category
        ? allProducts.filter((prod: Product) => prod.category === category)
        : allProducts;
    }

    if (category && product) {
      const response = await fetch(`./api/${category}.json`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} data`);
      }

      const categoryProducts: ItemCard[] = await response.json();

      return (
        categoryProducts.find((item: ItemCard) => item.id === product) || null
      );
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error);

    return product ? null : [];
  }
};
