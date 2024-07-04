import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../store/ShoppingCartContext';
import { ShoppingItem } from './ShoppingItem';
import { BackButton } from '../shared/Buttons/MoveButtons';
import { CartItem } from '../../types/CartItem';
import { ModalWindowContext } from '../../store/ModalWindowContext';
import { BASE_URL } from "../constants/URL's/URL's";
import { WindowSizeContext } from '../../store/WindowSizeContext';

export const ShoppingCart = React.memo(() => {
  const { shoppingList } = useContext(ShoppingCartContext);
  const { setIsOpenModal } = useContext(ModalWindowContext);
  const { scrollHeight, setScrollHeight } = useContext(WindowSizeContext);
  const naigate = useNavigate();

  const uniqueShoppingList = shoppingList.reduce<CartItem[]>((acc, item) => {
    if (!acc.some(i => i.itemId === item.itemId)) {
      acc.push(item);
    }

    return acc;
  }, []);

  const totalPrice = shoppingList.reduce(
    (total, device) => total + device.currentPrice,
    0,
  );

  useEffect(() => {
    if (scrollHeight !== document.documentElement.scrollHeight) {
      setScrollHeight(document.documentElement.scrollHeight);
    }
  }, [scrollHeight, setScrollHeight, uniqueShoppingList]);

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__back">
        <BackButton onMove={() => naigate(-1)} />
      </div>

      <h1 className="shopping-cart__title primary-title">Cart</h1>

      {shoppingList.length > 0 ? (
        <div className="shopping-cart__container">
          <div className="shopping-cart__list">
            {uniqueShoppingList
              .sort((item1, item2) => item1.id - item2.id)
              .map(item => (
                <ShoppingItem cartItem={item} key={item.id} />
              ))}
          </div>

          <div className="shopping-cart__total">
            <h2 className="shopping-cart__total-price">${totalPrice}</h2>

            <p className="shopping-cart__total-items">
              {shoppingList.length === 1
                ? 'Total for 1 item'
                : `Total for ${shoppingList.length} items`}
            </p>

            <button
              type="button"
              className="shopping-cart__checkout"
              onClick={() => setIsOpenModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="shopping-cart__empty">
          <img
            src={`${BASE_URL}/img/cart-is-empty.png`}
            alt="Empty cart"
            className="shopping-cart__empty-img"
          />
        </div>
      )}
    </div>
  );
});
