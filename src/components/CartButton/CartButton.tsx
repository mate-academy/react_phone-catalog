import React, { useState } from 'react';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';

type Props = {
  // eslint-disable-next-line react/require-default-props
  phone?: Phone,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const CartButton: React.FC<Props> = ({
  phone,
  cartProducts,
  setCartProducts,
}) => {
  const [buttonText, setButtonText] = useState('Add to cart');
  const [isInCart, setIsInCart] = useState(
    phone ? cartProducts.some(
      (cartProduct) => cartProduct.id === phone.id,
    ) : false,
  );

  const handleAddToCart = () => {
    if (phone) {
      setCartProducts((prevCartProducts) => {
        const existingCartItemIndex = prevCartProducts.findIndex(
          (cartItem) => cartItem.product.id === phone.id,
        );

        if (existingCartItemIndex !== -1) {
          const updatedCartProducts = [...prevCartProducts];

          updatedCartProducts.splice(existingCartItemIndex, 1);

          setButtonText('Add to cart');
          setIsInCart(false);

          return updatedCartProducts;
        }

        const newCartItem: CartItem = {
          id: phone.id,
          quantity: 1,
          product: phone,
        };

        setButtonText('Added to cart');
        setIsInCart(true);

        return [...prevCartProducts, newCartItem];
      });
    }
  };

  if (!phone) {
    return null;
  }

  return (
    <div className="cart-button">
      <button
        type="button"
        onClick={handleAddToCart}
        className={classNames('phone__button', {
          'phone__button--clicked': isInCart,
        })}
      >
        {buttonText}
      </button>
    </div>
  );
};
