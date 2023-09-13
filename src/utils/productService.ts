import { Product, ProductType } from '../types/product';

export enum SortBy {
  AGE = 'id',
  NAME = 'name',
  PRICE = 'price',
}

const reverseSign = (number: number) => {
  return -number;
};

function sortProducts(
  products: Product[],
  sortBy?: SortBy,
  desc?: boolean,
) {
  const sortedProducts = [...products];

  switch (sortBy) {
    case SortBy.AGE:
    case SortBy.PRICE:
      return sortedProducts.sort((proudctA, productB) => {
        return desc
          ? reverseSign(+proudctA[sortBy] - +productB[sortBy])
          : +proudctA[sortBy] - +productB[sortBy];
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

function filterProducts(
  products: Product[],
  filterBy?: ProductType,
  query?: string,
) {
  const filteredProducts = [...products];

  if (query) {
    filteredProducts.filter(product => {
      return product.name.includes(query);
    });
  }

  switch (filterBy) {
    case ProductType.PHONES:
    case ProductType.TABLET:
    case ProductType.ACCESSORY:
      return filteredProducts.filter(product => {
        return product.category as ProductType === filterBy;
      });
    default: return filteredProducts;
  }
}

function sliceProducts(
  products: Product[],
  page: number,
  perPage: number | string,
) {
  const slicedProducts = [...products];

  if (perPage === 'all') {
    return slicedProducts;
  }

  const startIndex = (page - 1) * +perPage;
  const endIndex = startIndex + +perPage;

  return slicedProducts.slice(startIndex, endIndex);
}

export const productService = {
  sortProducts,
  filterProducts,
  sliceProducts,
};
