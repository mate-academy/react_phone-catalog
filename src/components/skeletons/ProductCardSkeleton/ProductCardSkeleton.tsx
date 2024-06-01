/* eslint-disable max-len */
import { useLocation } from 'react-router-dom';
import './ProductCardSkeleton.scss';
import classNames from 'classnames';
import { ProductCategory } from '../../../types/types';

export const ProductCardSkeleton = () => {
  const { pathname } = useLocation();
  const pathArray = pathname.split('/').slice(-1)[0];

  return (
    <div
      className={classNames('productCardSkeleton', {
        productCardSkeleton__fix:
          pathArray !== ProductCategory.Accessories &&
          pathArray !== ProductCategory.Phones &&
          pathArray !== ProductCategory.Tablets,
      })}
    >
      <div
        className={classNames('skelet productCardSkeleton__photo', {
          'productCardSkeleton__photo--fix':
            pathArray !== ProductCategory.Accessories &&
            pathArray !== ProductCategory.Phones &&
            pathArray !== ProductCategory.Tablets,
        })}
      ></div>
      <div className="skelet productCardSkeleton__text"></div>
      <div className="productCardSkeleton__priceBlock">
        <div className="skelet productCardSkeleton__priceBlock--component"></div>
        <div className="skelet productCardSkeleton__priceBlock--component"></div>
      </div>
      <div className="skelet productCardSkeleton__line"></div>
      <div className="productCardSkeleton__charBlock">
        <div className="skelet productCardSkeleton__charBlock--component"></div>
        <div className="skelet productCardSkeleton__charBlock--component"></div>
      </div>
      <div className="productCardSkeleton__btnBlock">
        <div className="skelet productCardSkeleton__btnBlock--button"></div>
        <div className="skelet productCardSkeleton__btnBlock--heart"></div>
      </div>
    </div>
  );
};
