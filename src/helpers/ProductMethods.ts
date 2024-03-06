import Pluralize from 'pluralize';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from './clientApi';

export const getProducts = (url: string) => {
  return client.get<Product[]>(url);
};

export const getProductDetails = (url: string) => {
  return client.get<ProductDetails>(url);
};

export const getProductPriceWithDiscount = (product: Product) => {
  const productPriceWithDiscount = product.price * (1 - product.discount / 100);

  return productPriceWithDiscount;
};

export function getNumbers(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const getWordWithUpperCaseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getPluralOrSingle = (text: string, count: number) => {
  return count <= 1 ? text : Pluralize(text);
};

export const getSortedQuery = (products: Product[], query: string) => {
  return products.filter((el) => el.name.toLowerCase().trim()
    .includes(query.toLowerCase().trim()));
};

export const getIsFavourite = (
  favourites: Product[],
  product: Product | undefined,
) => {
  return favourites.find((el) => el.id === product?.id);
};

export const getIsAdded = (
  cartItems: CartItem[],
  product: Product | undefined,
) => {
  return cartItems.some((item) => item.product.id === product?.id);
};

export const handleFavourites = (
  e: React.MouseEvent,
  isFavourite: Product | undefined,
  product: Product | undefined,
  favourites: Product[],
  setFavourites: (favourites: Product[]) => void,
) => {
  e.preventDefault();
  if (!isFavourite && product) {
    setFavourites([product, ...favourites]);
  } else {
    const updatedFavourites = favourites.filter((el) => el.id !== product?.id);

    setFavourites(updatedFavourites);
  }
};

export const sortProducts = (phones: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'Newest':
      phones.sort((a, b) => a.age - b.age);
      break;
    case 'Cheapest':
      phones.sort(
        (a, b) => getProductPriceWithDiscount(a)
        - getProductPriceWithDiscount(b),
      );
      break;
    case 'Alphabetically':
      phones.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }
};
