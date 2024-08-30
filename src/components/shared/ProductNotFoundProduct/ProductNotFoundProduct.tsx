/* eslint-disable react/no-unescaped-entities */
import { useLocation } from 'react-router-dom';
import styles from './ProductNotFoundProduct.module.scss';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { useContext } from 'react';

export const ProductNotFoundeProduct = () => {
  const { isSunSelected } = useContext(GlobalContext);

  const location = useLocation();
  const decodedPathname = decodeURIComponent(location.pathname);
  const productName = decodedPathname.replace('/phones/', '');

  return (
    <div className={styles.errors}>
      <h2
        className={classNames(styles.errors__title, {
          [styles.errors__title_dark]: !isSunSelected,
        })}
      >{`There is no product: ${productName}`}</h2>
      <p className={styles.errors__description}>
        We couldn't find the product you are looking for. Please check the URL
        or go back to the previous page.
      </p>

      <div className={styles.errors__img}></div>
    </div>
  );
};
