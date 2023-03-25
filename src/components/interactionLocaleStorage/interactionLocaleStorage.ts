import { Product } from '../../type/product';

export const setToLocaleStorage = (
  place: 'cart' | 'favourites',
  product: Product,
) => {
  const productsList = window.localStorage.getItem(place);

  if (!productsList) {
    window.localStorage.setItem(place, JSON.stringify([product]));
    window.dispatchEvent(new Event('storage'));

    return;
  }

  const newProductsList = JSON.parse(productsList);

  for (let i = 0; i < newProductsList.length; i += 1) {
    if (newProductsList[i].id === product.id && place === 'favourites') {
      const favoritesList = [...newProductsList];

      favoritesList.splice(i, 1);
      const cleanedList = [...favoritesList];

      window.localStorage.setItem(place, JSON.stringify([...cleanedList]));
      window.dispatchEvent(new Event('storage'));

      return;
    }

    if (newProductsList[i].id === product.id) {
      return;
    }
  }

  window.localStorage.setItem(
    place, JSON.stringify([...newProductsList, product]),
  );
  window.dispatchEvent(new Event('storage'));
};

export const isProductInStorage = (
  storagePlaceList: Product[] | null,
  product: Product,
) => {
  if (!storagePlaceList) {
    return false;
  }

  for (let i = 0; i < storagePlaceList.length; i += 1) {
    if (storagePlaceList[i].id === product.id) {
      return true;
    }
  }

  return false;
};

export const getCartList = (
  callback: React.Dispatch<React.SetStateAction<Product[] | null>>,
) => {
  const productsInCart = window.localStorage.getItem('cart');

  if (productsInCart) {
    callback(JSON.parse(productsInCart));
  }
};

export const getFavouritesList = (
  callback: React.Dispatch<React.SetStateAction<Product[] | null>>,
) => {
  const productsInFavourites = window.localStorage.getItem('favourites');

  if (productsInFavourites) {
    callback(JSON.parse(productsInFavourites));
  }
};
