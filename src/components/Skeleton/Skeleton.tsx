import './Skeleton.scss';
import React from 'react';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const Skeleton: React.FC<Props> = React.memo(({ products }) => (
  <div className="skeletons">
    {products.map(product => {
      return (
        <div className="skeleton-card" key={product.id}>
          <div className="skeleton-card__image skeleton"></div>

          <div className="skeleton-card__text">
            <div className="skeleton-card__line skeleton"></div>
            <div className="skeleton-card__line skeleton"></div>
            <div className="skeleton-card__line skeleton"></div>
            <div className="skeleton-card__line skeleton"></div>
            <div className="skeleton-card__line skeleton"></div>
          </div>

          <div className="skeleton-card__footer">
            <div className="skeleton-card__button skeleton"></div>
            <div className="skeleton-card__icon skeleton"></div>
          </div>
        </div>
      );
    })}
  </div>
));

Skeleton.displayName = 'Skeleton';
