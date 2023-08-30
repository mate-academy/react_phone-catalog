import { addFavoriteProduct } from '../features/favoritesSlice';
import { PageType } from '../types/PageType';
import { Product } from '../types/Product';

export const addProduct = (
  product: Product,
  products: Product[],
  pageType: PageType,
  dispatch: (action: unknown) => void,
) => {
  if (pageType === PageType.Favorites) {
    localStorage.setItem(pageType, JSON.stringify([...products, product]));
    dispatch(addFavoriteProduct(product));
  }
  // else {
  //   JSON.stringify([...products, product]);
  //   dispatch(addFavoriteProduct(product));
  // }
};
