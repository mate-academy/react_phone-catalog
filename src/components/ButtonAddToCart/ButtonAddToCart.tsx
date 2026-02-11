import { useContext, useMemo } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon';
import styles from './ButtonAddToCart.module.scss';
import { FavContext } from '../../modules/shared/context/FavContext';
import { CartContext } from '../../modules/shared/context/CartContext';

export const ButtonAddToCart = ({
  size = 40,
  productId,
}: {
  size?: number;
  productId: string;
}) => {
  const { favouritesIds, setFavouritesIds } = useContext(FavContext);

  const { cart, addToCart } = useContext(CartContext);

  const exists = cart.some(i => i.itemId === productId);

  const isFavourite = useMemo(
    () => favouritesIds.includes(productId),
    [favouritesIds, productId],
  );

  const toggleItem = (
    list: string[],
    setList: (v: string[]) => void,
    id: string,
  ) => {
    setList(
      list.includes(id) ? list.filter(itemId => itemId !== id) : [...list, id],
    );
  };

  const handleToggleFavourite = () =>
    toggleItem(favouritesIds, setFavouritesIds, productId);

  return (
    <div className={styles['controls-buttons']}>
      <button
        className={`${styles['controls-buttons__add']} ${exists && styles['controls-buttons__add--active']} ${exists && styles['controls-buttons__add--no-hover']}`}
        style={{ height: `${size}` }}
        disabled={exists}
        onClick={() => addToCart(productId)}
      >
        {exists ? 'Selected' : 'Add to cart'}
      </button>
      <ButtonWithIcon
        iconName="favourites"
        size={size}
        onClick={handleToggleFavourite}
        isToggled={isFavourite}
      />
    </div>
  );
};
