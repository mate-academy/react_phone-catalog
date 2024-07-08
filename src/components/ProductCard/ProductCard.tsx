import styles from './ProductCard.module.scss';
import { ActionButtons } from '../ActionButtons';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC = () => {
  return (
    <div className={styles.ProductCard}>
            <Link
        to="/placeholder-link"  // Linia 9: Zmiana na placeholder link
        className={styles.imageContainer}
      >
        <img
          className={styles.image}
          src="https://via.placeholder.com/150"  // Linia 12: Zmiana na placeholder image
          alt="placeholder image"
        />
      </Link>

      <div className={styles.wrapper}>
                <Link to="/placeholder-link" className={styles.title}>
          {'Smartphone XXX'}
        </Link>

        <div className={styles.price}>
          <div className={styles.existPrice}>${`xxx`}</div>
          <div className={styles.hotPrice}>${`xxx`}</div>
        </div>

        <div className={styles.divider}></div>
        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{`xxx`}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{`xxx`}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{`xxx`}</p>
          </div>
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};
