import React from 'react';
import './CartItems.scss';
import { IconButton } from '../../../shared/components/Buttons/IconButton';
import { CartItem } from '../../../../types/CartItem';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { Button } from '../../../shared/components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  className: string;
};

export const CartItems: React.FC<Props> = ({ className }) => {
  const { cartItems, setCartItems } = useGlobalContext();
  const navigate = useNavigate();

  const takeAction = (item: CartItem, operation: 'minus' | 'plus') => {
    const updatedCartItem: CartItem = {
      ...item,
      quantity: operation === 'minus' ? item.quantity - 1 : item.quantity + 1,
    };

    setCartItems(current =>
      current.map(cartItem =>
        cartItem.id === item.id ? updatedCartItem : cartItem,
      ),
    );
  };

  const deleteItem = (item: CartItem) => {
    setCartItems(current =>
      current.filter(cartItem => cartItem.id !== item.id),
    );
  };

  return (
    <div className={`cart-items ${className}`}>
      {cartItems.map(item => {
        return (
          <div className="cart-items__item" key={item.id}>
            <div className="cart-items__first-row">
              <Button
                className="cart-items__button-close"
                name="close"
                onClick={() => deleteItem(item)}
              />
              <div className="cart-items__wrapper-photo">
                <img
                  src={item.product.image}
                  alt="photo-item"
                  className="cart-items__img"
                  onClick={() => navigate(`/product/${item.product.itemId}`)}
                />
              </div>
              <p className="cart-items__title">{item.product.name}</p>
            </div>
            <div className="cart-items__second-row">
              <div className="cart-items__counter">
                <IconButton
                  className="cart-items__button cart-items__button--minus"
                  name="minus"
                  onClick={() => takeAction(item, 'minus')}
                  disabled={item.quantity === 1}
                />
                <div className="cart-items__count">{item.quantity}</div>
                <IconButton
                  className="cart-items__button cart-items__button--plus"
                  name="plus"
                  onClick={() => takeAction(item, 'plus')}
                  disabled={false}
                />
              </div>
              <h3 className="cart-items__price">{`$${item.product.price * item.quantity}`}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
