import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/constants';
import { CardButtons } from '../CardButtons';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  fullPriceOnCard?: boolean | undefined;
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  fullPriceOnCard,
}) => {
  const { image, name, price, screen, capacity, ram, itemId, category } =
    product;

  const productDetailsLink = `/${category}/${itemId}`;

  const showFullPrice = () => {
    if (fullPriceOnCard) {
      return <div className={styles.hotPrice}>${product.fullPrice}</div>;
    } else {
      return;
    }
  };

  return (
    <div className={styles.productCard}>
      <NavLink to={productDetailsLink} className={styles.imageContainer}>
        <img className={styles.image} src={`${BASE_URL}${image}`} alt="image" />
      </NavLink>

      <NavLink to={productDetailsLink} className={styles.title}>
        {name}
      </NavLink>

      <div className={styles.price}>
        <div className={styles.existPrice}>${price}</div>

        {showFullPrice()}
      </div>
      {/*  */}
      <hr className={styles.divider} />
      <div className={styles.description}>
        <div className={styles.existDescription}>
          <p className={styles.descriptionTitle}>Screen</p>
          <p className={styles.descriptionText}>{screen}</p>
        </div>

        <div className={styles.existDescription}>
          <p className={styles.descriptionTitle}>Capacity</p>
          <p className={styles.descriptionText}>{capacity}</p>
        </div>

        <div className={styles.existDescription}>
          <p className={styles.descriptionTitle}>RAM</p>
          <p className={styles.descriptionText}>{ram}</p>
        </div>
      </div>
      <CardButtons product={product} />
    </div>
  );
};
