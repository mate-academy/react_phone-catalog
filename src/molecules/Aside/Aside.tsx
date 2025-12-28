import styles from './Aside.module.scss';
import Link from '@/atoms/Link';
import HeartIcon from '@/assets/icons/heart.svg?react';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';

const Aside = () => {
  return (
    <aside data-menu-aside className={styles.aside}>
      <div className={styles.aside__menu}>
        <div className={styles.aside__link}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/phones">Phones</Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/tablets">Tablets</Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/accessories">Accessories</Link>
        </div>
      </div>

      <div className={styles.control}>
        <a className={`${styles.control__button} ${styles.response__b}`}>
          <HeartIcon className={styles.control__icon} />
        </a>
        <a className={`${styles.control__button} ${styles.response__b}`}>
          <BagIcon className={styles.control__icon} />
        </a>
      </div>
    </aside>
  );
};

export default Aside;
