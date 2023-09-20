import React, { useContext } from 'react';

import { CartContext } from '../../providers/CartProvider/CartProvider';

import { Product } from '../../types/Product';

import crossIcon from '../../images/cross.svg';
import './CartItem.scss';

type Props = {
  product: Product;
};

const PLUS = 'PLUS';
const MINUS = 'MINUS';

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    name,
    id,
    quantity,
    image,
    price,
  } = product;
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  const itemPrice = price * quantity;

  const handleRemoveItem = (itemId: string) => {
    setProductsInCart(
      productsInCart.filter(productInCart => productInCart.id !== itemId),
    );
  };

  const handleChangeQuantity = (itemId: string, action: string) => {
    const isItemInCart
      = productsInCart.some(cartItem => cartItem.id === itemId);

    if (quantity && isItemInCart) {
      if (action === PLUS) {
        setProductsInCart(productsInCart.map(prodInCart => {
          if (prodInCart.id === itemId) {
            return {
              ...prodInCart,
              quantity: quantity + 1,
            };
          }

          return prodInCart;
        }));
      }

      if (action === MINUS) {
        setProductsInCart(productsInCart.map(prodInCart => {
          if (prodInCart.id === itemId) {
            return {
              ...prodInCart,
              quantity: quantity - 1,
            };
          }

          return prodInCart;
        }));
      }

      if (quantity === 0) {
        handleRemoveItem(itemId);
      }
    }
  };

  return (
    <div className="CartItem">
      <button
        type="button"
        className="CartItem__remove-btn"
        data-cy="cartDeleteButton"
        onClick={() => handleRemoveItem(id)}
      >
        <img src={crossIcon} alt="delete item" />
      </button>
      <div className="CartItem__photo">
        <img src={image} alt="product" className="CartItem__img" />
      </div>
      <div className="CartItem__title">
        {name}
      </div>
      <button
        type="button"
        className="CartItem__decrease"
        onClick={() => handleChangeQuantity(id, MINUS)}
      >
        -
      </button>
      <div
        className="CartItem__quantity"
        data-cy="productQuantity"
      >
        {quantity}
      </div>
      <button
        type="button"
        className="CartItem__increase"
        onClick={() => handleChangeQuantity(id, PLUS)}
      >
        +
      </button>
      <div className="CartItem__price">{`$${itemPrice}`}</div>
    </div>
  );
};
