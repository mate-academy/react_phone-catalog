import { FC } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './CartPage.module.scss';

export const CartPage: FC = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.productTop}>
        <Breadcrumbs />
        <h1 className={styles.title}>Cart</h1>
      </div>
      <div className={styles.list}></div>
    </div>
  );
};
