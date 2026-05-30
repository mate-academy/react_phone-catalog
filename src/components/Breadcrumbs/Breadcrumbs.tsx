import { FC } from 'react';
import styles from './Breadcrumbs.module.scss';
import Arrow from 'assets/icons/arrow-right.svg';
import Home from 'assets/icons/home.svg';
import { Link } from 'react-router-dom';

type Props = {
  category?: string;
  productName?: string;
  text?: string;
};

const Breadcrumbs: FC<Props> = ({ category, productName, text }) => {
  if (text) {
    return (
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.home} src={Home} alt="to main page" />
        </Link>
        <img className={styles.arrow} src={Arrow} alt="arrow right" />
        <p className={styles.text}>{text}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.home} src={Home} alt="to main page" />
      </Link>
      <img className={styles.arrow} src={Arrow} alt="arrow right" />

      {category && (
        <>
          <Link to={`/${category}`} className={styles.categoryLink}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
          <img className={styles.arrow} src={Arrow} alt="arrow right" />
        </>
      )}

      <p className={styles.text}>{productName}</p>
    </div>
  );
};

export default Breadcrumbs;
