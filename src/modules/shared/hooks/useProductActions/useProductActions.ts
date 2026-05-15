import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { transformToProduct } from '../../utils/transformProduct';

export const useProductActions = (item: Product | ProductDetails) => {
  const { addToCart, isProductInCart, deleteFromCart } = useCart();
  const { addToFavorites, isProductInFavorites, deleteFromFavorites } = useFavorites();

  const productId = 'itemId' in item ? String(item.itemId) : String(item.id);

  const isInCart = isProductInCart(productId);
  const isInFavorites = isProductInFavorites(productId);

  const handleCartAction = () => {
    if (isInCart) {
      deleteFromCart(productId);
    } else {
      const productToSave = transformToProduct(item);

      addToCart({ ...productToSave, id: productId });
    }
  };

  const handleFavoritesAction = () => {
    if (isInFavorites) {
      deleteFromFavorites(productId);
    } else {
      const productToSave = transformToProduct(item);

      addToFavorites({ ...productToSave, id: productId });
    }
  };

  return { isInCart, isInFavorites, handleCartAction, handleFavoritesAction };
};
