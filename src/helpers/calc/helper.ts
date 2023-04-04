import { CartProduct } from '../../types/CartProduct';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { Product, ProductDetails } from '../../types/Product';
import { RouteTypes } from '../../types/RouteTypes';
import { SearchParams } from '../../types/SearchParams';
import { SortTypes } from '../../types/SortTypes';
import { TechSpec } from '../../types/TechSpec';

const techSpec: string[] = Object.values(TechSpec);

export const getDiscount = (price: number, fullPrice: number) => {
  return fullPrice - price;
};

export const sortByDiscountCallBack = (
  firstProduct: Product,
  secondProduct: Product,
) => {
  const firstPrice = firstProduct.price;
  const firstFullPrice = firstProduct.fullPrice;
  const secondPrice = secondProduct.price;
  const secondFullPrice = secondProduct.fullPrice;
  const firstAbsoluteDisc = getDiscount(firstPrice, firstFullPrice);
  const secondAbsoluteDisc = getDiscount(secondPrice, secondFullPrice);

  return secondAbsoluteDisc - firstAbsoluteDisc;
};

export const getSliderWidth = (
  itemsPerSlide: number,
  itemWidth: number,
  itemMargin: number,
) => {
  return itemsPerSlide * itemWidth + (itemsPerSlide - 1 * itemMargin);
};

export const sortByPriceCallback = (
  firstProduct: Product,
  secondProduct: Product,
) => {
  const firstPrice = firstProduct.price;
  const secondPrice = secondProduct.price;

  return secondPrice - firstPrice;
};

export const getAmout = (products: Product[], type: string) => {
  return products.filter((product) => product.category === type);
};

export const getSearchWith = (
  currentSearch: URLSearchParams,
  paramsToUpdate: SearchParams,
) => {
  const newParams = new URLSearchParams(currentSearch.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach((item) => {
        newParams.append(key, item);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};

const sortByAgeCallback = (first: Product, second: Product) => {
  return second.year - first.year;
};

const sortByNameCallback = (first: Product, second: Product) => {
  return first.name.localeCompare(second.name);
};

export const sortBySortOptions = (products: Product[], sortOption: string) => {
  switch (sortOption) {
    case SortTypes.Newest.toLowerCase():
      return products.sort(sortByAgeCallback);

    case SortTypes.Alphabetically.toLowerCase():
      return products.sort(sortByNameCallback);

    case SortTypes.Cheapest.toLowerCase():
      return products.sort(sortByPriceCallback).reverse();

    default:
      return products;
  }
};

export const getPerPageFromSearch = (
  searchParams: URLSearchParams,
  products: Product[],
) => {
  const itemsPerPage = searchParams.get('perPage') || 'all';

  switch (+itemsPerPage) {
    case +ItemsOnPage.Four:
      return +ItemsOnPage.Four;

    case +ItemsOnPage.Eight:
      return +ItemsOnPage.Eight;

    case +ItemsOnPage.Sixteen:
      return +ItemsOnPage.Sixteen;

    default:
      return products.length;
  }
};

export const getPaginationNumbers = (from: number, to: number) => {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
};

export const handleProductsFilter = (
  products: Product[],
  searchParams: URLSearchParams,
) => {
  let copyOfProducts: Product[];

  if (!products) {
    return [];
  }

  copyOfProducts = [...products];

  if (searchParams.has('sort')) {
    const sortOption = searchParams.get('sort');

    copyOfProducts = sortBySortOptions(copyOfProducts, sortOption || '');
  }

  if (searchParams.has('query')) {
    const query = searchParams.get('query')?.toLowerCase();

    copyOfProducts = copyOfProducts.filter(({ name }) => {
      const formattedName = name.toLowerCase();

      return formattedName.includes(query || '');
    });
  }

  return copyOfProducts;
};

export const getCorrectColor = (color: string) => {
  switch (color) {
    case 'midnightgreen':
      return 'green';
    case 'spacegray':
      return 'gray';
    default:
      return color;
  }
};

export const getProductOptionLink = (
  details: ProductDetails | null,
  newColor?: string,
  newCapacity?: string,
) => {
  const name = details?.namespaceId;
  const capacity = details?.capacity;
  const color = details?.color;

  const phoneLink = `${name}-`;

  if (newColor && !newCapacity) {
    return `${phoneLink}${capacity}-${newColor}`.toLowerCase();
  }

  if (!newColor && newCapacity) {
    return `${phoneLink}${newCapacity}-${color}`.toLowerCase();
  }

  return `${phoneLink}${capacity}-${color}`;
};

export const createCartItem = (product: Product): CartProduct => {
  return {
    id: crypto.randomUUID(),
    product,
    quantity: 1,
  };
};

export const getCartTotalPrice = (cart: CartProduct[]) => {
  return cart
    ?.map(({ product, quantity }) => {
      return quantity * product.price;
    })
    .reduce((prev, current) => prev + current, 0);
};

export const getCartTotalAmount = (cart: CartProduct[]) => {
  return cart
    ?.map(({ quantity }) => {
      return quantity;
    })
    .reduce((prev, current) => prev + current, 0);
};

type GenerateMessageParams = (
  message: string,
  setNewMessage: (newMessage: string) => void
) => void;

export const generateMessage: GenerateMessageParams = (
  message,
  setNewMessage,
) => {
  setNewMessage(message);

  const timer = setTimeout(() => {
    setNewMessage('');
    clearTimeout(timer);
  }, 3000);
};

export const getCorrectPathname = (pathname: string) => {
  switch (true) {
    case pathname.includes(RouteTypes.Phones):
      return ['Phones', RouteTypes.Phones];
    case pathname.includes(RouteTypes.Tablets):
      return ['Tablets', RouteTypes.Tablets];
    case pathname.includes(RouteTypes.Accessories):
      return ['Accessories', RouteTypes.Accessories];
    case pathname.includes(RouteTypes.Favorites):
      return ['Favorites', RouteTypes.Accessories];
    case pathname.includes(RouteTypes.Cart):
      return ['Cart', RouteTypes.Cart];
    default:
      return pathname;
  }
};

export const firstLetterToUppercase = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getTechSpec = (productInfo: ProductDetails) => {
  const arrayOfTechSpec: [string, string | string[]][] = [];

  Object.entries(productInfo).forEach(([key, value]) => {
    if (techSpec.includes(key) && arrayOfTechSpec) {
      arrayOfTechSpec.push([key, value]);
    }
  });

  return arrayOfTechSpec;
};
