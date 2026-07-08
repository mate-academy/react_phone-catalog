//react-router
import { Link } from 'react-router-dom';

//styles
import styles from './Categories.module.scss';

//services
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles.categories, className)}>
      <h2 className={styles.title}>Shop by category</h2>

      <Link to="/phones" className={styles.link}>
        <div
          className={`${styles['block-link']} ${styles['block-link--phones']}`}
        ></div>
        <h3 className={styles['category-title']}>Mobile phones</h3>
        <p className={styles['sub-text']}>95 models</p>
      </Link>

      <Link to="/tablets" className={styles.link}>
        <div
          className={`${styles['block-link']} ${styles['block-link--tablets']}`}
        ></div>
        <h3 className={styles['category-title']}>Tablets</h3>
        <p className={styles['sub-text']}>24 models</p>
      </Link>

      <Link to="/accessories" className={styles.link}>
        <div
          className={`${styles['block-link']} ${styles['block-link--accessories']}`}
        ></div>
        <h3 className={styles['category-title']}>Accessories</h3>
        <p className={styles['sub-text']}>100 models</p>
      </Link>
    </div>
  );
};
