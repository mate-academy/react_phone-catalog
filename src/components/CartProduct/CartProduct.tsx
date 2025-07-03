import './CartProduct.scss';
import { ProductInCart } from '../../types/ProductInCart';
import { useAppDispatch } from '../../customHooks/customHooks';
import { decrement, increment, removeFromCart } from '../../expansions/cart';
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  product: ProductInCart;
};

export const CartProduct: React.FC<Props> = React.memo(({ product }) => {
  const totalProductPrice = product.price * product.quantity;
  const [price, setPrice] = useState<number>(totalProductPrice);
  const dispatch = useAppDispatch();

  const handleAdd = (prodId: number) => {
    dispatch(increment(prodId));
    setPrice(prev => prev + product.price);
  };

  const handleDelete = (prodId: number) => {
    if (product.quantity === 1) {
      return;
    } else {
      setPrice(prev => prev - product.price);
    }

    dispatch(decrement(prodId));
  };

  return (
    <div className="cartProduct">
      <div className="cartProduct__image_section">
        <div
          className="cartProduct__image_section_remove"
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          <img src="src\images\logo\closeGray.svg" alt="Remove" />
        </div>

        <div className="cartProduct__image_section__product_image">
          <img
            src={product.image}
            alt={product.name}
            className="cartProduct__image_section_img"
          />
        </div>

        <p className="cartProduct__image_section__title">{product.name}</p>
      </div>

      <div className="cartProduct__info_section">
        <div className="count">
          <div
            className={classNames('count__button count__button_minus', {
              'count__button_minus-disabled': product.quantity === 1,
            })}
            onClick={() => handleDelete(product.id)}
          >
            <img
              src={
                product.quantity === 1
                  ? 'src/images/logo/minusDisabled.svg'
                  : 'src/images/logo/minusLight.svg'
              }
              alt="Minus"
              className="count__button__minus_img"
            />
          </div>

          <div className="count__quantity">{product.quantity}</div>

          <div className="count__button" onClick={() => handleAdd(product.id)}>
            <img
              src="src\images\logo\plus.svg"
              alt="Plus"
              className="count__button_plus"
            />
          </div>
        </div>
        <div className="cartProduct__info_section__price">{`$${price}`}</div>
      </div>
    </div>
  );
});

CartProduct.displayName = 'CartProduct';
