import { ProductType } from 'types/productTypes';

export const sortProducts = (productItem: ProductType[], sorted: string) => {
  switch (sorted) {
    case 'Newest':
      return [...productItem].sort(
        (a, b) => new Date(b.year).getTime() - new Date(a.year).getTime(),
      );
    case 'Alphabetically':
      return [...productItem].sort((a, b) => a.name.localeCompare(b.name));
    case 'Cheapest':
      return [...productItem].sort((a, b) => {
        const priceA = a.fullPrice - a.price;
        const priceB = b.fullPrice - b.price;

        return priceA - priceB;
      });
    default:
      return productItem;
  }
};
