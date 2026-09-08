import HeartIcon from '../../assets/icons/heart.svg?react';
import RedHeartIcon from '../../assets/icons/heart_red.svg?react';
import styles from './ActionBtns.module.scss';
import { Product, ShortProduct } from '../../shared/models';
import { useFavorites } from '../../shared/context/Favorites';
import { useEffect, useState } from 'react';

interface Props {
  product: ShortProduct | Product;
  assignClassName?: string;
}

export const FavoriteBtn = ({ product, assignClassName = '' }: Props) => {
  const { favoritesItems, addFavorite, removeFavorite } = useFavorites();

  const isShort = (p: any): p is ShortProduct =>
    typeof p.itemId === 'string' && typeof p.capacity === 'string';

  const itemKey: string | number = isShort(product)
    ? product.itemId
    : product.id;

  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    setIsFav(
      favoritesItems.some(item => {
        const key = isShort(item) ? item.itemId : item.id;
        return key === itemKey;
      }),
    );
  }, [favoritesItems, itemKey]);

  const handleToggle = () => {
    if (isFav) {
      removeFavorite(itemKey.toString());
    } else {
      addFavorite(product);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.favorite} ${assignClassName} ${isFav ? styles.favorite_selected : ''}`}
      onClick={handleToggle}
    >
      {isFav ? <RedHeartIcon /> : <HeartIcon />}
    </button>
  );
};
