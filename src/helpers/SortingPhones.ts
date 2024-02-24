import { Product } from '../types/Product';

export function sortProducts(productArray: Product[],
  sortValue: string,
  itemsPerPage: string,
  currentPage: number) {
  const productsCopy = [...productArray];

  switch (sortValue) {
    case 'age':
      productsCopy.sort((item1, item2) => {
        return item2.year - item1.year;
      });
      break;
    case 'name':
      productsCopy.sort((item1, item2) => {
        return item1.name
          .localeCompare(item2.name);
      });
      break;
    case 'price':
      productsCopy.sort((item1, item2) => {
        return item1.price - item2.price;
      });
      break;
    default:
      break;
  }

  if (!Number.isNaN(parseInt(itemsPerPage, 10))) {
    const startIndex = (currentPage - 1) * parseInt(itemsPerPage, 10);
    const endIndex = startIndex + parseInt(itemsPerPage, 10);

    return productsCopy.slice(startIndex, endIndex);
  }

  return productsCopy;
}
