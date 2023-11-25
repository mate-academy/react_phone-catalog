// eslint-disable-next-line max-len
import { addFavoriteProduct, removeFavoriteProduct } from '../features/favoriteProducts/favoriteProductsSlice';
// eslint-disable-next-line max-len
import { addProductToCart, removeProductFromCart } from '../features/shoppingCart/shoppingCartSlice';
import { Product } from '../types/product';

export const addProducts = (
  dispatch: (action: unknown) => void,
  existingProducts: Product[],
  product: Product,
  category: string,
) => {
  const isProductInList = existingProducts.some(pr => pr.id === product.id);

  if (!isProductInList) {
    localStorage
      .setItem(category, JSON.stringify([...existingProducts, product]));

    if (category === 'favoriteProducts') {
      dispatch(addFavoriteProduct(product));
    } else {
      dispatch(addProductToCart(product));
    }
  } else {
    localStorage.setItem(category, JSON.stringify(
      existingProducts.filter(prod => prod.id !== product.id),
    ));

    if (category === 'favoriteProducts') {
      dispatch(removeFavoriteProduct(product));
    } else {
      dispatch(removeProductFromCart(product.id));
    }
  }
};
