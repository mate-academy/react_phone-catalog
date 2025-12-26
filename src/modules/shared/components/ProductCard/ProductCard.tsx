import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { FavouriteButton } from '../FavouriteButton';
import { AddToCartButton } from '../AddToCartButton';
import { Product, ProductDetailed } from '../../../../types/types';

type Props = {
  product: Product | ProductDetailed;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const image = 'image' in product ? product.image : product.images[0];
  const price = 'price' in product ? product.price : product.priceDiscount;
  const fullPrice = 'fullPrice' in product ? product.fullPrice : product.priceRegular;
  const id = 'itemId' in product ? product.itemId : product.id;
  const category = 'category' in product ? product.category : '';

  return (
    <div className={styles.productCard}>
      <Link to={`/${category}/${id}`} className={styles.productCard__link}>
        <div className={styles.productCard__imgWrapper}>
          <img src={`./${image}`} alt={product.name} />
        </div>
        <p className={styles.productCard__title}>{product.name}</p>
      </Link>

      <div className={styles.productCard__prices}>
        <p className={styles.productCard__price}>${price}</p>
        {fullPrice > 0 && <p className={styles.productCard__fullPrice}>${fullPrice}</p>}
      </div>

      <div className={styles.productCard__details}>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>Screen</p>
          <p className={styles.productCard__detailValue}>
            {product.screen.length > 15 ? `${product.screen.slice(0, 15)}...` : product.screen}
          </p>
        </div>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>Capacity</p>
          <p className={styles.productCard__detailValue}>{product.capacity}</p>
        </div>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>RAM</p>
          <p className={styles.productCard__detailValue}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.productCard__actions}>
        <AddToCartButton product={product} />
        <FavouriteButton product={product} />
      </div>
    </div>
  );
};
