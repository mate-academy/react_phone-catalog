import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/productCard.module.scss';
import { CardButtons } from './ui/buttons';
import { CatalogueProduct, Product } from '@shared/types';
import { Item } from '@features/globalStore/types';

type Props = {
  product: CatalogueProduct | Product;
  isIn: {
    fav: (itemId: string) => boolean;
    cart: (itemId: string) => boolean;
  };
  stateHandlers: {
    toggleCart: (e: React.MouseEvent, item: Item) => void;
    toggleFav: (e: React.MouseEvent, item: Item) => void;
  };
  linkHandler: (e: React.MouseEvent, id: string) => void;
};

export const ProductCard = forwardRef<HTMLLIElement, Props>(
  ({ product, isIn, stateHandlers, linkHandler }, ref) => {
    const {
      id,
      name,
      priceRegular,
      priceDiscount,
      screen,
      capacity,
      ram,
      images,
    } = product;
    const { fav, cart } = isIn;
    const { toggleCart, toggleFav } = stateHandlers;
    const item = { id: id };

    return (
      <li ref={ref} className={styles.container}>
        <Link
          to={`/product/${id}`}
          className={styles['product-card']}
          onClick={e => linkHandler(e, id)}
        >
          <div className={styles['image-wrapper']}>
            <img className={styles.image} src={images[0]} alt={name} />
          </div>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.price}>
            {`$${priceDiscount}`}
            {priceRegular && (
              <span className={styles['full-price']}>{`$${priceRegular}`}</span>
            )}
          </span>

          <dl className={styles.descr}>
            <dt className={styles.descr__type}>Screen</dt>
            <dd className={styles.descr__val}>{screen}</dd>

            <dt className={styles.descr__type}>Capacity</dt>
            <dd className={styles.descr__val}>{capacity}</dd>

            <dt className={styles.descr__type}>RAM</dt>
            <dd className={styles.descr__val}>{ram}</dd>
          </dl>

          <CardButtons
            item={item}
            isInFav={fav(id)}
            isInCart={cart(id)}
            handleCart={toggleCart}
            handleFav={toggleFav}
          />
        </Link>
      </li>
    );
  },
);

ProductCard.displayName = 'ProductCard';
