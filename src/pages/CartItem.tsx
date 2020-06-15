import React from 'react';
import './CardItem.scss';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setQuantity, removeFromCart } from '../store/cart';

type Props = {
  cartProduct: CartProduct;
};

export const CartItem: React.FC<Props> = ({ cartProduct: { product, quantity } }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="Cart__item">
        <button
          onClick={() => dispatch(removeFromCart(product))}
          className="Cart__button_close"
          type="button"
        >
          {}
        </button>
        <img className="Cart__img" src={product.imageUrl} alt="img" />
        <p className="Cart__name">{product.name}</p>
        <div className="Cart__counter counter">
          <button
            type="button"
            disabled={quantity === 1}
            className={cn('PhoneSlider__btn counter__btn_minus btn', { counter__btn_disabled: quantity === 1 })}
            onClick={() => dispatch(setQuantity(product, quantity - 1))}
          >
            { }
          </button>
          <p className="Cart__counter_value">{quantity}</p>
          <button
            type="button"
            className="PhoneSlider__btn counter__btn_plus btn"
            onClick={() => dispatch(setQuantity(product, quantity + 1))}
          >
            { }
          </button>
        </div>
        <div className="Cart__price">
          <h2>{`$${product.price - product.discount}`}</h2>
          <span className="Cart__price_discount">{product.discount === 0 ? '' : `$${product.price}`}</span>
        </div>
      </div>
    </>
  );
};
