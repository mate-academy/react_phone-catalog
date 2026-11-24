import React from 'react';

import hero from '/public/img/product-not-found.png';

import styles from './NotFoundProducts.module.scss';

type Props = {
  title?: string;
  category?: string;
  onReload?: () => void;
};

export const NotFoundProducts: React.FC<Props> = ({
  title,
  category,
  onReload,
}) => {
  return (
    <div className={styles['not-found-products']}>
      <img
        src={hero}
        alt="Not Found Products"
        className={styles['not-found-products__image']}
      />
      <p className={styles['not-found-products__description']}>
        {title ? title : `There are no ${category ?? 'product'}`}
      </p>
      {onReload && (
        <button
          className={styles['not-found-products__button']}
          onClick={onReload}
        >
          Reload
        </button>
      )}
    </div>
  );
};
