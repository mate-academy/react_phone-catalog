import React from 'react';
import notFoundProductStyles from './NotFoundProductPage.module.scss';

export const NotFoundProductPage = () => {
  return (
    <div className={notFoundProductStyles.notFoundProduct}>
      <h2 className={notFoundProductStyles.notFoundProduct__title}>
        Oops! Product not found
      </h2>
      <p className={notFoundProductStyles.notFoundProduct__text}>
        Sorry, we couldn&apos;t find the product you&apos;re looking for.
      </p>
      <img
        src="img/product-not-found.png"
        alt="Not found product image"
        className={notFoundProductStyles.notFoundProduct__image}
      />
    </div>
  );
};
