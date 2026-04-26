import { Product } from '../../features/types/productType';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { ProductActions } from '../ProductActions';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const { name, fullPrice, price, image, screen, capacity, ram } = product;

  const imgSrc = image.startsWith('/') ? image : `/${image}`;

  return (
    <article className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__link}
      >
        <img src={imgSrc} alt={name} className={styles.productCard__image} />

        <h3 className={styles.productCard__title}>{name}</h3>

        <div className={styles.productCard__price}>
          <span className={styles.productCard__priceCurrent}>
            ${showDiscount ? price : fullPrice}
          </span>

          {showDiscount && (
            <span className={styles.productCard__priceOld}>${fullPrice}</span>
          )}
        </div>

        <div className={styles.productCard__specs}>
          <div>
            <span>Screen</span>
            <strong>{screen}</strong>
          </div>
          <div>
            <span>Capacity</span>
            <strong>{capacity}</strong>
          </div>
          <div>
            <span>RAM</span>
            <strong>{ram}</strong>
          </div>
        </div>
      </Link>
      <ProductActions itemId={product.itemId} />
    </article>
  );
};
