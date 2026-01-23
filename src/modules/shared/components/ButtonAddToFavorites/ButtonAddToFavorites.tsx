import { useFavorites } from '../../hooks/useFavorites';
import { Product } from '../../types/Product';
import styles from './ButtonAddToFavorites.module.scss';

type Props = {
  product: Product;
};

export const ButtonAddToFavorites = ({ product }: Props) => {
  const { items, toggle } = useFavorites();

  const isInFavorites = items.some(item => item.id === product.id);

  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      className={styles.button}
      aria-pressed={isInFavorites}
    >
      <img
        src={
          isInFavorites ? '/img/icons/heart-filled.png' : '/img/icons/heart.png'
        }
        alt={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
        className={styles.icon}
      />
    </button>
  );
};
