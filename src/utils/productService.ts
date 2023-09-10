import { Product, ProductType } from '../types/product';

enum SortBy {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

const reverseSign = (number: number) => {
  return -number;
};

export function sortProducts(
  products: Product[],
  sortBy: SortBy,
  desc: boolean,
) {
  const sortedProducts = [...products];

  switch (sortBy) {
    case SortBy.AGE:
    case SortBy.PRICE:
      return sortedProducts.sort((proudctA, productB) => {
        return desc
          ? reverseSign(proudctA[sortBy] - productB[sortBy])
          : proudctA[sortBy] - productB[sortBy];
      });
    case SortBy.NAME:
      return sortedProducts.sort((productA, productB) => {
        return desc
          ? reverseSign(productA[sortBy].localeCompare(productB[sortBy]))
          : productA[sortBy].localeCompare(productB[sortBy]);
      });
    default: return sortedProducts;
  }
}

export function filterProducts(
  products: Product[],
  filterBy: ProductType,
  query?: string,
) {
  const filteredProducts = [...products];

  if (query) {
    filteredProducts.filter(product => {
      return product.name.includes(query);
    });
  }

  switch (filterBy) {
    case ProductType.PHONE:
    case ProductType.TABLET:
    case ProductType.ACCESSORY:
      return filteredProducts.filter(product => {
        return product.type as ProductType === filterBy;
      });
    default: return filteredProducts;
  }
}
