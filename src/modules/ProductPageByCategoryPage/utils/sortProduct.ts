import { AllProducts } from '../../../shared/types/AllProduct/AllProduct';

export const sortProducts = (products: AllProducts[], sortBy: string) => {
  const sortProduct = [...products];

  switch (sortBy) {
    case 'Newest':
      return sortProduct.sort((a, b) => b.year - a.year);

    case 'Alphabetically':
      return sortProduct.sort((a, b) => a.name.localeCompare(b.name));

    case 'Price low to high':
      return sortProduct.sort((a, b) => a.price - b.price);

    case 'Price high to low':
      return sortProduct.sort((a, b) => b.price - a.price);

    default:
      return sortProduct;
  }
};
