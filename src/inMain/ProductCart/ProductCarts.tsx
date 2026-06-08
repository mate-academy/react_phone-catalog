import { NavLink } from 'react-router-dom';
import styles from './ProductCarts.module.scss';
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
    <article>
      <h2 className={styles.productTitle}>
        <NavLink to={`/product/${id}`}>
          <img className={styles.cardPhoto} src="/img" alt={title} />
        </NavLink>
      </h2>
      <span className={styles.cardPrice}>${price}</span>

      <span className={styles.cardScreen}>{screen}</span>
      <span className={styles.cardCapacity}>{capacity}</span>
      <span className={styles.cardRAM}>{ram}</span>
      <span className={styles.actions}></span>
      <button className={styles.cardToAdd} data-qa="card-hover">
        Add to cart
      </button>
      <FavoritesIcon count={0} />
    </article>
  );
};
