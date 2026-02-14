import './BreadCrumbs.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import React from 'react';
import home from '../../images/logo/home.svg';
import arrow from '../../images/logo/arrowRight.svg';

type Props = {
  currentProduct?: ProductDetails;
};

export const BreadCrumbs: React.FC<Props> = ({ currentProduct }) => {
  const { pathname } = useLocation();
  const productName = currentProduct?.name;
  const categoryName = pathname.slice(1).split('/')[0];

  function capitalizedName(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <div className="breadCrumbs">
      <div className="breadCrumbs__container">
        <div className="breadCrumbs__logo">
          <Link to="/" className="breadCrumbs__logo_link">
            <img src={home} alt="home" className="breadCrumbs__logo_img" />
          </Link>
        </div>

        <span className="breadCrumbs__arrow">
          <img src={arrow} alt="arrow" className="breadCrumbs__arrow_img" />
        </span>

        {!productName ? (
          <p className="breadCrumbs__category">
            {capitalizedName(categoryName)}
          </p>
        ) : (
          <>
            <Link
              to={`/${categoryName}`}
              className={classNames('breadCrumbs__category', {
                'breadCrumbs__category-active': productName,
              })}
            >
              {capitalizedName(categoryName)}
            </Link>

            <span className="breadCrumbs__arrow">
              <img src={arrow} alt="Arrow" className="breadCrumbs__arrow_img" />
            </span>

            <p className="breadCrumbs__category_product">{productName}</p>
          </>
        )}
      </div>
    </div>
  );
};
