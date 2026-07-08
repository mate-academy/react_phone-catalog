//hooks
import { useCart } from '../../hooks/useCart';
import { useFavourites } from '../../hooks/useFavourites';

//style
import styles from './ProductCard.module.scss';

//types
import { ProductDetailed } from '../../types/product';

//components
import { Button } from '../Button';

//services
import classNames from 'classnames';

//assets
import favouritesIcon from './assets/icons/Favourites.svg';
// eslint-disable-next-line max-len
import favouritesIconFilled from './assets/icons/Favourites Filled (Heart Like).svg';

type Props = {
  product: ProductDetailed;
  className?: string;
  onClick?: () => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  className,
  onClick,
}) => {
  const { inCart, toggleCart, isCheckingCart } = useCart(product.id);
  const { inFav, toggleFavourites, isCheckingFav } = useFavourites(product.id);

  return (
    <div onClick={onClick} className={classNames(styles.card, className)}>
      <img
        src={product.images[0]}
        alt={product.name}
        className={styles.image}
      />

      <p className={styles.name}>{product.name}</p>

      <div className={styles.prices}>
        <span className={styles.priceCurrent}>${product.priceDiscount}</span>
        <span className={styles.priceOld}>${product.priceRegular}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.spec}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          className={styles.cartButton}
          selected={inCart}
          onClick={toggleCart}
        >
          {isCheckingCart ? 'Checking...' : inCart ? 'Added' : 'Add to cart'}
        </Button>

        <Button
          variant="iconType"
          className={styles.favButton}
          onClick={toggleFavourites}
        >
          {isCheckingFav ? (
            '...'
          ) : inFav ? (
            <img src={favouritesIconFilled} alt="favorites-icon" />
          ) : (
            <img src={favouritesIcon} alt="favorites-icon" />
          )}
        </Button>
      </div>
    </div>
  );
};
