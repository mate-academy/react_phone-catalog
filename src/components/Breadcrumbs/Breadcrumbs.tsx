import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import React from 'react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = location.pathname.split('/').filter(path => path);
  const products = useAppSelector(state => state.products);
  const currentProduct = products.find(
    (product: Product) =>
      product.itemId === breadcrumbs[breadcrumbs.length - 1],
  ) || { name: breadcrumbs[breadcrumbs.length - 1] };

  breadcrumbs.pop();
  breadcrumbs.push(currentProduct.name);

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__item breadcrumbs__item--link">
        <img
          src="./img/icons/home.svg"
          alt="Home"
          className="breadcrumbs__item__image"
        />
      </Link>
      {breadcrumbs.map((crumb, index) => {
        const routeTo = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
        const isLast = index === breadcrumbs.length - 1;
        const crumbName = crumb.charAt(0).toUpperCase() + crumb.slice(1);

        return (
          <div key={index} className="breadcrumbs__item">
            <img src="./img/icons/arrow-right.svg" alt="Arrow right" />
            {!isLast ? (
              <Link to={routeTo} className="breadcrumbs__item--link">
                {crumbName}
              </Link>
            ) : (
              <span className="breadcrumbs__item breadcrumbs__item--last">
                {crumbName}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
