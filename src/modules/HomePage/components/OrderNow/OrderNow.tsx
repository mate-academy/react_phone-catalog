import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderNow.module.scss';

type Props = {
  url: string;
  title: string;
  subtitle: string;
};

export const OrderNow: React.FC<Props> = ({ url, title, subtitle }) => {
  return (
    <div className={styles['order-now']}>
      <div className={styles['order-now__content']}>
        <h3 className={styles['order-now__title']}>{title}</h3>
        <p className={styles['order-now__text']}>{subtitle}</p>
      </div>

      <div className="order-now__link">
        <Link to={url} className={styles['order-now__button']}>
          Order now
        </Link>
      </div>
    </div>
  );
};
