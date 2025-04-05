import React from 'react';
import notFoundProductStyles from './NotFoundProductPage.module.scss';

export const NotFoundProductPage = () => {
  return (
    <div className={notFoundProductStyles.notFoundProduct}>
      <h1 className={notFoundProductStyles.notFoundProduct__title}>
        Oops! Product not found
      </h1>
      <p className={notFoundProductStyles.notFoundProduct__text}>
        Sorry, we couldn&apos;t find the product you&apos;re looking for.
      </p>
      <img
        src="/public/img/product-not-found.png"
        alt=""
        className={notFoundProductStyles.notFoundProduct__image}
      />
    </div>
  );
};
