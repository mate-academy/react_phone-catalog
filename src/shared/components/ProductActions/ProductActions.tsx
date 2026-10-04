import { ProductActionButton } from '../ProductActionButton';
import { FavoriteButton } from '../FavoriteButton';
import styles from './ProductActions.module.scss';
import { Product } from '@/shared/types/Product';
import { useCart } from '@/shared/context/CartContext/useCart';
import { useFavorites } from '@/shared/context/FavoriteContext/useFavorites';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
};

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isInCart = cart.some(item => item.product.itemId === product.itemId);
  const isInFavorites = favorites.some(item => item.itemId === product.itemId);

  const { t } = useTranslation();

  return (
    <div className={styles.productActions}>
      <ProductActionButton
        text={isInCart ? t('cart.addedToCart') : t('cart.addToCart')}
        onClick={() =>
          isInCart ? removeFromCart(product.itemId) : addToCart(product)
        }
        className={isInCart ? styles.addedToCart : ''}
      />
      <FavoriteButton
        onClick={() =>
          isInFavorites
            ? removeFromFavorites(product.itemId)
            : addToFavorites(product)
        }
        className={isInFavorites ? styles.addedToFavorites : ''}
        isInFavorites={isInFavorites}
      />
    </div>
  );
};
