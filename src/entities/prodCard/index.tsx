import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseProduct } from '@shared/types/APITypes';
import styles from './styles/productCard.module.scss';
import { useProdCard } from './model/useProdCard';
import { CardButtons } from './ui/buttons';

type Props = {
  product: BaseProduct;
};

export const ProductCard = forwardRef<HTMLLIElement, Props>(
  ({ product }, ref) => {
    const {
      image,
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
      itemId,
      category,
    } = product;

    const { handleCart, handleFav, isInFav, isInCart } = useProdCard({
      id: product.id,
    });

    return (
      <li ref={ref} className={styles.container}>
        <Link to={`/${category}/${itemId}`} className={styles['product-card']}>
          <div className={styles['image-wrapper']}>
            <img className={styles.image} src={image} alt={name} />
          </div>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.price}>
            {`${price}$`}
            {fullPrice && (
              <span className={styles['full-price']}>{`${fullPrice}$`}</span>
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
            isInFav={isInFav}
            isInCart={isInCart}
            handleCart={handleCart}
            handleFav={handleFav}
          />
        </Link>
      </li>
    );
  },
);

ProductCard.displayName = 'ProductCard';
