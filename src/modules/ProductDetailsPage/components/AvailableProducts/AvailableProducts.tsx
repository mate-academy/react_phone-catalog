import React from 'react';
import styles from './AvailableProducts.module.scss';

type Props = {
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
};

export const AvailableProducts: React.FC<Props> = ({
  title,
  ariaLabel,

  children,
}) => {
  return (
    <article aria-label={ariaLabel} className={styles['available-products']}>
      <div role="heading" className={styles['available-products__title']}>
        {title}
      </div>
      <ul className={styles['available-products__content']}>{children}</ul>
    </article>
  );
};
