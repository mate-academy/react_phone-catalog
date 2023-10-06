import { CartProduct } from '../types/CartProduct';
import { CatalogProduct } from '../types/CatalogProduct';
import { FavoriteProduct } from '../types/FavoriteProduct';
import { SortBy, Location } from './enums';
import { getProductsList } from './fetchData';

export const handleSearch = (
  arrayToFilter: CatalogProduct[],
  query: string,
): CatalogProduct[] | [] => {
  const search = query.toLowerCase();

  const newArray = arrayToFilter
    .filter((
      item: CatalogProduct | CartProduct,
    ) => item.name.toLowerCase().includes(search));

  return newArray;
};

export const handleCurrentItemsList = (
  array: CatalogProduct[] | [],
  perPageValue: string,
  pageNumber: string,
): CatalogProduct[] => {
  if (!array.length) {
    return [];
  }

  let firstProductIndex: number;
  let lastProductIndex: number;

  if (perPageValue === 'all') {
    firstProductIndex = 0;
    lastProductIndex = array.length;
  } else {
    firstProductIndex = (+pageNumber - 1) * +perPageValue;
    lastProductIndex = (firstProductIndex + +perPageValue - 1) < array.length
      ? (firstProductIndex + +perPageValue - 1)
      : array.length;
  }

  const currentList = array.filter((_product, index) => (
    index >= firstProductIndex && index <= lastProductIndex
  ));

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return currentList;
};

export const isSortBy = (itemValue: string): itemValue is SortBy => {
  return Object.values<string>(SortBy).includes(itemValue);
};

export const isLocation = (itemValue: string): itemValue is Location => {
  return Object.values<string>(Location).includes(itemValue);
};

export const handleSorting = (array: CatalogProduct[], sortValue: string) => {
  switch (sortValue) {
    case SortBy.Alphabetically:
      return [...array].sort((
        itemA, itemB,
      ) => itemA.name.localeCompare(itemB.name));

    case SortBy.Cheapest:
      return [...array].sort((
        itemA, itemB,
      ) => itemA.fullPrice - itemB.fullPrice);

    case SortBy.Newest:
    default:
      return [...array].sort((itemA, itemB) => itemA.year - itemB.year);
  }
};

export const handleLoadMore = (
  array: CatalogProduct[],
  perPageValue: string,
  currentItemsList: CatalogProduct[],
  setCurrentArray: React.Dispatch<React.SetStateAction<CatalogProduct[]>>,
) => {
  const firstItemIndex = currentItemsList.length - 1;

  const lastItemIndex
    = (firstItemIndex + +perPageValue) < array.length
      ? (firstItemIndex + +perPageValue)
      : array.length;

  const arrayToAdd = array.filter((_product, index) => (
    index >= firstItemIndex + 1 && index <= lastItemIndex
  ));

  setCurrentArray(prevArray => [...prevArray, ...arrayToAdd]);
};

export const getLinkToProduct = (
  category: string,
  nameId: string,
  capacity: string,
  color: string,
) => {
  return `/${category}/${nameId}-${capacity.toLowerCase()}-${color}`;
};

export const getMemoryCapacity = (value: string) => {
  const number = parseFloat(value);

  return `${number}${value.replace(`${number}`, ' ')}`;
};

export const getSuggestedProducts = async (
  screen: string,
  capacity: string,
  itemId: string,
) => {
  try {
    const products = await getProductsList();

    const suggestedProducts = products.filter((product: CatalogProduct) => {
      if (product.itemId !== itemId && (product.screen === screen
        || product.capacity === capacity)) {
        return product;
      }

      return null;
    });

    return suggestedProducts;
  } catch (error) {
    return [];
  }
};

export const getCurrentProductList = (
  products: CatalogProduct[],
  sort: string,
  query: string,
  perPage: string,
  page: string,
  setPaginationTotal: React.Dispatch<React.SetStateAction<number>>,
) => {
  const sortedPhones = handleSorting(products, sort);

  let currentList;

  if (query) {
    const searchResult = handleSearch(sortedPhones, query);

    setPaginationTotal(searchResult.length);
    currentList = handleCurrentItemsList(
      searchResult, perPage, page,
    );
  } else {
    setPaginationTotal(products.length);
    currentList = handleCurrentItemsList(
      sortedPhones, perPage, page,
    );
  }

  return currentList;
};

export const getCurrentFavorites = (
  products: FavoriteProduct[],
  query: string,
) => {
  const search = query.toLowerCase();

  const newArray = products
    .filter((
      item: FavoriteProduct,
    ) => item.name.toLowerCase().includes(search));

  return newArray;
};
