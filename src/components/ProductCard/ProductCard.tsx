import styles from '../ProductCard/productCard.module.scss';

import { ProductCardType } from '../../types/productCard';
import { ProductActions } from '../ProductActions/ProductActions';
import { Link } from 'react-router-dom';

type Props = {
  item: ProductCardType;
};

export const ProductCard = ({ item }: Props) => {
  const formatScreen = (screen?: string) => {
    if (!screen) {
      return '';
    }

    return screen
      .replace(/\(.*?\)/, '')
      .replace('display', '')
      .trim();
  };

  return (
    <div key={item.id} className={styles.models}>
      <Link
        to={`/${item.category}/${item.itemId}`}
        className={styles.models__link}
      >
        <img
          className={styles.models__images}
          src={`/react_phone-catalog/${item.image}`}
          alt={item.name}
        />
      </Link>
      <div className={styles.phone}>
        <p className={styles.phone__title}>{item.name}</p>

        <div className={styles.phone__prices}>
          <p className={styles.phone__price}>${item.price}</p>

          <p className={styles.phone__fullPrice}>${item.fullPrice}</p>
        </div>

        <ul className={styles.specs}>
          <li className={styles.specs__spec}>
            Screen
            <p className={styles.specs__spec__data}>
              {formatScreen(item.screen)}
            </p>
          </li>
          <li className={styles.specs__spec}>
            Capacity
            <p className={styles.specs__spec__data}>{item.capacity}</p>
          </li>
          <li className={styles.specs__spec}>
            RAM
            <p className={styles.specs__spec__data}>{item.ram}</p>
          </li>
        </ul>
      </div>

      <ProductActions id={item.itemId} />
    </div>
  );
};
