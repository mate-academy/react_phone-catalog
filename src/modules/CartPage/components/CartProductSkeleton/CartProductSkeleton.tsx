import React from 'react';
import './CartProductSkeleton.scss';

type Props = {
  className?: string;
};

export const CartProductSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <article className={`cart-product-skeleton ${className}`.trim()}>
      <div className="cart-product-skeleton__info-wrapper">
        <div className="cart-product-skeleton__remove-btn" />

        <div className="cart-product-skeleton__image" />
        <div className="cart-product-skeleton__title-wrapper">
          <div
            className="
              cart-product-skeleton__title
              cart-product-skeleton__title--text-1
            "
          />
          <div
            className="
              cart-product-skeleton__title
              cart-product-skeleton__title--text-2
            "
          />
        </div>
      </div>

      <div className="cart-product-skeleton__action-wrapper">
        <div className="cart-product-skeleton__quantity-controls">
          <div className="cart-product-skeleton__btn" />
          <div className="cart-product-skeleton__value" />
          <div className="cart-product-skeleton__btn" />
        </div>

        <div className="cart-product-skeleton__price" />
      </div>
    </article>
  );
};
