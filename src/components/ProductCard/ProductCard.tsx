import './ProductCard.module.scss';
import { ActionButtons } from '../ActionButtons';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: ProductPhone | ProductTablet | ProductAccessory;
  // handleSelectedProduct: (newState: string) => "";
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) {
    return <div>No product available</div>;
  }

  const { images, name, priceRegular, priceDiscount, screen, capacity, ram } = product;

  return (
    <div className={styles.ProductCard}>
      <Link
        to="/placeholder-link" // Zmień na odpowiedni link
        className={styles.imageContainer}
      >
        <img
          className={styles.image}
          src={images[0]}
          alt={name}
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to="/placeholder-link" className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.existPrice}>${priceRegular}</div>
          <div className={styles.hotPrice}>${priceDiscount}</div>
        </div>

        <div className={styles.divider}></div>

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

        <ActionButtons />
      </div>
    </div>
  );
};
