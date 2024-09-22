import React, { useContext } from 'react';
import { Phone } from '../../types/Phone';
import { Accessory } from '../../types/Accessory';
import { Tablet } from '../../types/Tablet';
import { ProductCount } from '../ProductCount/ProductCount';
import { CatalogContext } from '../../CatalogContext';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const CartUnit: React.FC<Props> = ({ product }) => {
  const { removeFromCart } = useContext(CatalogContext);

  return (
    <div className="cart-unit">
      <div className="cart-unit__item">
        <button
          className="cart-unit__sub-item cart-unit__btn-close icon icon--closer"
          onClick={() => removeFromCart(product)}
        ></button>
        <div className="cart-unit__sub-item cart-unit__image-container">
          <img src={`${product.images[0]}`} alt="" className="cart-unit__image" />
        </div>
        <p className="cart-unit__sub-item cart-unit__name">{product.name}</p>
      </div>
      <div className="cart-unit__item">
        <div className="cart-unit__sub-item cart-unit__counter">
          <ProductCount product={product} />
        </div>
        <div className="cart-unit__sub-item cart-unit__price">
          <span className="cart-unit__price">${product.priceDiscount}</span>
        </div>
      </div>
    </div>
  );
};
