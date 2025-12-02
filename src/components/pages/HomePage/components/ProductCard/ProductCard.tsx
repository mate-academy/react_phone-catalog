import { Link } from 'react-router-dom';
import { Product } from '../../../../../types/Product';
import { Btns } from '../../../../shared/Btns';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  category: string;
};

export const ProductCard: React.FC<Props> = ({ product, category }) => {
const showDiscount = product.priceDiscount < product.priceRegular;

  return (
    <div className={styles.productCart__slide}>
      <Link
        to={`../../${category}/${product.id}`}
        className={styles.productCart__link}
      >
        <div className={styles.productCart__imgWraper}>
          <img
            src={`./${product.images[0]}`}
            alt={product.name}
            className={styles.productCart__img}
          />
        </div>

        <h4 className={styles.productCart__name}>{product.name}</h4>

        <div className={styles.productCart__prices}>
          {showDiscount ? (
            <p className={styles.productCart__price}>
              ${product.priceDiscount}{' '}
              <span className={styles.productCart__priceGray}>
                ${product.priceRegular}
              </span>
            </p>
          ) : (
            <p className={styles.productCart__price}>${product.priceRegular}</p>
          )}
        </div>

        <div className={styles.productCart__properties}>
          <div className={styles.productCart__property}>
            <p className={styles.productCart__propertyName}>Screen</p>
            <p className={styles.productCart__propertyValue}>
              {product.screen.length > 8
                ? product.screen.slice(0, 8) + '...'
                : product.screen}
            </p>
          </div>
          <div className={styles.productCart__property}>
            <p className={styles.productCart__propertyName}>Capacity</p>
            <p className={styles.productCart__propertyValue}>
              {product.capacity}
            </p>
          </div>
          <div className={styles.productCart__property}>
            <p className={styles.productCart__propertyName}>RAM</p>
            <p className={styles.productCart__propertyValue}>{product.ram}</p>
          </div>
        </div>
      </Link>
      <Btns product={product} />
    </div>
  );
};
