import { useContext } from 'react';
import styles from './ItemsCounterIcon.module.scss';
import { CartContext } from '../Contexts/CartContext';
import { FavouritesContext } from '../Contexts/FavouritesContext';

type Props = {
  icon: 'favourites' | 'cart';
};

export const ItemsIconCounter: React.FC<Props> = ({ icon }) => {
  const { addedProducts } = useContext(CartContext);
  const { favProducts } = useContext(FavouritesContext);

  const productsType = icon === 'favourites' ? favProducts : addedProducts;

  return (
    <div className={styles.iconInnerContainer}>
      {productsType.length > 0 && (
        <span className={styles.counterContainer}>
          <span className={styles.counter}>{productsType.length}</span>
        </span>
      )}

      <span className={`icon ${icon}`} />
    </div>
  );
};
