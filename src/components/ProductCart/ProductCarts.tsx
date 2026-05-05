import { NavLink } from 'react-router-dom';
import styles from './ProductCarts.module.css';
import { FavoritesIcon } from '../../utils/icons';

type Props = {
  id: string;
  title: string;
  price: number;
  screen?: string;
  capacity?: string;
  ram?: string;
};

export const ProductCarts: React.FC<Props> = ({
  id,
  title,
  price,
  screen,
  capacity,
  ram,
}) => {
  return (
    <div className={styles.container}>
      <article>
        <h2 className={styles.productTitle}>
          <NavLink to={`/product/${id}`}>
            <img
              className={styles.cardPhoto}
              src="/img/imac.jpeg"
              alt={title}
            />
          </NavLink>
        </h2>
        <div className={styles.cardPrice}>${price}</div>

        <div className={styles.cardScreen}>{screen}</div>
        <div className={styles.cardCapacity}>{capacity}</div>
        <div className={styles.cardRAM}>{ram}</div>
        <div className={styles.actions}>
          <button className={styles.cardAddTo} data-qa="card-hover">
            Add to cart
          </button>
          <FavoritesIcon count={0} />
        </div>
      </article>
    </div>
  );
};
