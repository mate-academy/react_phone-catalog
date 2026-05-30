//hooks
import { useCart } from '../../../../hooks';
import { useFavourites } from '../../../../hooks';

//styles
import styles from './Header.module.scss';

//components
import { Button } from '../../../../components/Button';
import { SpecRow } from '../SpecRow';
import { ColorsList } from '../ColorsList';
import { CapacityList } from '../CapacityList';

//types
import { ProductDetailed } from '../../../../types/product';

//services
import classNames from 'classnames';

//assets
import favouritesIcon from './assets/icons/Favourites.svg';
// eslint-disable-next-line max-len
import favouritesIconFilled from './assets/icons/Favourites Filled (Heart Like).svg';
import { ImageSelect } from '../ImageSelect';

type Props = {
  product: ProductDetailed;
  className?: string;
};

export const Header: React.FC<Props> = ({ product, className }) => {
  const { inCart, toggleCart, isCheckingCart } = useCart(product?.id ?? null);
  const { inFav, toggleFavourites, isCheckingFav } = useFavourites(
    product?.id ?? null,
  );

  return (
    <header className={classNames(styles.header, className)}>
      <ImageSelect images={product.images} />

      <div className={styles.mainControls}>
        <p className={styles.subtitle}>Available colors</p>
        <ColorsList className={styles.colors} product={product} />

        <hr className={styles.divider} />

        <p className={styles.subtitle}>Select capacity</p>
        <CapacityList className={styles.capacities} product={product} />

        <hr className={styles.divider} />

        <div className={styles.prices}>
          <h2 className={styles.priceCurrent}>${product.priceDiscount}</h2>
          <h3 className={styles.priceOld}>${product.priceRegular}</h3>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            className={styles.cartButton}
            selected={inCart}
            onClick={toggleCart}
          >
            {isCheckingCart ? 'Checking...' : inCart ? 'Added' : 'Add to cart'}
          </Button>

          <Button
            variant="iconType"
            size="md"
            onClick={toggleFavourites}
            className={styles.favButton}
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

        <div className={styles.spec}>
          <SpecRow value={product.screen}>Screen</SpecRow>
          <SpecRow value={product.resolution}>Resolution</SpecRow>
          <SpecRow value={product.processor}>Processor</SpecRow>
          <SpecRow value={product.ram}>RAM</SpecRow>
        </div>
      </div>
    </header>
  );
};
