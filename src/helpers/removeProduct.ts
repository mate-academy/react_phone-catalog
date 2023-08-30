import { removeFavoriteProduct } from '../features/favoritesSlice';
import { PageType } from '../types/PageType';
import { Product } from '../types/Product';

export const removeProduct = (
  product: Product,
  products: Product[],
  pageType: PageType,
  dispatch: (action: unknown) => void,
) => {
  if (pageType === PageType.Favorites) {
    localStorage.setItem(pageType,
      JSON.stringify(products.filter(item => item.id !== product.id)));
    dispatch(removeFavoriteProduct(product));
  }
  // else {
  //   JSON.stringify([...products, product]);
  //   dispatch(addFavoriteProduct(product));
  // }
};
