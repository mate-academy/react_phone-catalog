import React from 'react';

import cn from 'classnames';
import './ProductCardSkeleton.scss';

type Props = {
  className?: string;
};

export const ProductCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <article className={cn('product-card-skeleton', className)}>
      <div className="product-card-skeleton__image-container">
        <div className="product-card-skeleton__image" />
      </div>

      <div
        className="
          product-card-skeleton__title-line
          product-card-skeleton__title-line--full
          "
      />
      <div
        className="
          product-card-skeleton__title-line
          product-card-skeleton__title-line--short
          "
      />

      <div className="product-card-skeleton__price-block">
        <div className="product-card-skeleton__price" />
      </div>

      <div className="product-card-skeleton__specs product-specs">
        <div className="product-specs__row">
          <div className="product-card-skeleton__spec-name" />
          <div className="product-card-skeleton__spec-value" />
        </div>
        <div className="product-specs__row">
          <div className="product-card-skeleton__spec-name" />
          <div className="product-card-skeleton__spec-value" />
        </div>
        <div className="product-specs__row">
          <div className="product-card-skeleton__spec-name" />
          <div className="product-card-skeleton__spec-value" />
        </div>
      </div>

      <div className="product-card-skeleton__actions">
        <div className="product-card-skeleton__btn-add" />
        <div className="product-card-skeleton__btn-favorite" />
      </div>
    </article>
  );
};
