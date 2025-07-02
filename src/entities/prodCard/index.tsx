import { Link } from 'react-router-dom';
import styles from './productCard.module.scss';

export const ProductCard = () => {
  return (
    <li>
      <Link to="/" className={styles['product-card']}>
        <figure className={styles['product-card__img-wrapper']}>
          <img
            className={styles['product-card__img']}
            src="img/phones/apple-iphone-7/black/00.webp"
          ></img>
        </figure>
        <h3 className={styles.name}>Apple iPhone 11 128GB Black</h3>
        <span className={styles.price}>$1100</span>
        <dl className={styles.descr}>
          <dt className={styles.descr__type}>Screen</dt>
          <dd className={styles.descr__val}>6.1 IPS</dd>

          <dt className={styles.descr__type}>Capacity</dt>
          <dd className={styles.descr__val}>128GB</dd>

          <dt className={styles.descr__type}>RAM</dt>
          <dd className={styles.descr__val}>4GB</dd>
        </dl>
        <div className={styles.btns}>
          <button className={styles.btns__cart}>Add to cart</button>
          <button className={styles.btns__fav}>Fav</button>
        </div>
      </Link>
    </li>
  );
};
