import { useContext } from 'react';
import { FavoritesContext } from '../../_store/FavoritesProvider';
import { CartContext } from '../../_store/CartProvider';
import { ButtonPrimary } from '../ButtonPrimary';
import { IconButton } from '../IconButton';
import { Product, ProductWithDetails } from '../../../../_types/products';
import styles from './AddToCardButton.module.scss';

type Props = {
  product: ProductWithDetails | Product;
  height: '40' | '48';
};

export const AddToCardButton: React.FC<Props> = ({ product, height }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext);

  const { addToCart, isInCard } = useContext(CartContext);

  return (
    <div
      className={`${styles.addToCartButton} ${styles[`addToCartButton--height-${height}`]}`}
    >
      {isInCard(product.itemId) ? (
        <ButtonPrimary title={'Added to cart'} isSelected={true} />
      ) : (
        <ButtonPrimary
          title={'Add to cart'}
          onClick={() => addToCart(product.itemId)}
        />
      )}
      {isFavorite(product.itemId) ? (
        <IconButton
          modificator={'heart'}
          selected={true}
          onClick={() => removeFromFavorites(product.itemId)}
        />
      ) : (
        <IconButton
          modificator={'heart'}
          onClick={() => addToFavorites(product.itemId)}
        />
      )}
    </div>
  );
};
