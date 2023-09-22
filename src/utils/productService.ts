import { Product, ProductType } from '../types/product';
import { Item } from '../types/storageItem';

export enum SortBy {
  AGE = 'id',
  NAME = 'name',
  PRICE = 'price',
  DISCOUNT = 'discount',
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
    case SortBy.DISCOUNT:
      return sortedProducts.sort((productA, productB) => {
        return (productB.fullPrice - productB.price)
          - (productA.fullPrice - productA.price);
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
    return filteredProducts.filter(product => {
      const normalizedName = product.name.toLowerCase().trim();
      const normalizedQuery = query.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
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

function filterItems(
  items: Item<Product>[],
  query?: string,
) {
  const filteredItems = [...items];

  if (query) {
    return filteredItems.filter(item => {
      const normalizedName = item.value.name.toLowerCase().trim();
      const normalizedQuery = query.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }

  return filteredItems;
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

function getRandomProducts(products: Product[]) {
  const index = Math.round(Math.random() * (products.length - 12));

  return products.slice(index, index + 12);
}

export const productService = {
  sortProducts,
  filterProducts,
  filterItems,
  sliceProducts,
  getRandomProducts,
};
