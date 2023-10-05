import React, { useContext } from 'react';
import './CartItem.scss';
import { Phone } from '../../types/Phone';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Phone,
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

  const itemValue = price * quantity;

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
        setProductsInCart(productsInCart.map(productInCart => {
          if (productInCart.id === itemId) {
            return {
              ...productInCart,
              quantity: quantity + 1,
            };
          }

          return productInCart;
        }));
      }

      if (action === MINUS) {
        setProductsInCart(productsInCart.map(productInCart => {
          if (productInCart.id === itemId) {
            return {
              ...productInCart,
              quantity: quantity - 1,
            };
          }

          return productInCart;
        }));
      }

      if (quantity === 0) {
        handleRemoveItem(itemId);
      }
    }
  };

  return (
    <div className="cartItem">
      <button
        type="button"
        className="cartItem__removeBtn"
        onClick={() => handleRemoveItem(id)}
      >
        <div className="cartItem__cross" />
      </button>
      <div className="cartItem__photo">
        <img src={`/_new/${image}`} alt="product img" className="cartItem__img" />
      </div>
      <div className="cartItem__title">
        {name}
      </div>
      <button
        type="button"
        className="cartItem__decrease"
        onClick={() => handleChangeQuantity(id, MINUS)}
      >
        -
      </button>
      <div
        className="cartItem__quantity"
      >
        {quantity}
      </div>
      <button
        type="button"
        className="cartItem__increase"
        onClick={() => handleChangeQuantity(id, PLUS)}
      >
        +
      </button>
      <div className="cartItem__price">{`$${itemValue}`}</div>
    </div>
  );
};
