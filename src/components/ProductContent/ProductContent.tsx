import { Card } from '../Card';
import styles from './ProductContent.module.scss';

export const ProductContent = () => {
  return (
    <div className={styles['product-content']}>
      <ul className={styles['product-content__list']}>
        <li className={styles['product-content__item']}>
          <Card />
        </li>
        <li className={styles['product-content__item']}>
          <Card />
        </li>
        <li className={styles['product-content__item']}>
          <Card />
        </li>
        <li className={styles['product-content__item']}>
          <Card />
        </li>
        <li className={styles['product-content__item']}>
          <Card />
        </li>
      </ul>
    </div>
  );
};
