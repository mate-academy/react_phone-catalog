import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../store/ShoppingCartContext';
import { ShoppingItem } from './ShoppingItem';
import { BackButton } from '../shared/Buttons/MoveButtons';
import { CartItem } from '../../types/CartItem';
import { ModalWindowContext } from '../../store/ModalWindowContext';

export const ShoppingCart = React.memo(() => {
  const { shoppingList } = useContext(ShoppingCartContext);
  const { setIsOpenModal } = useContext(ModalWindowContext);
  const naigate = useNavigate();

  const uniqueShoppingList = shoppingList.reduce<CartItem[]>((acc, item) => {
    if (!acc.some(i => i === item)) {
      acc.push(item);
    }

    return acc;
  }, []);

  const totalPrice = shoppingList.reduce(
    (total, device) => total + device.currentPrice,
    0,
  );

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__back">
        <BackButton move={() => naigate(-1)} />
      </div>

      <h1 className="shopping-cart__title primary-title">Cart</h1>

      {shoppingList.length > 0 && (
        <div className="shopping-cart__container">
          <div className="shopping-cart__list">
            {uniqueShoppingList.map(item => (
              <ShoppingItem cartItem={item} key={item.itemId} />
            ))}
          </div>

          <div className="shopping-cart__total">
            <h2 className="shopping-cart__total-price">${totalPrice}</h2>

            <p className="shopping-cart__total-items">
              Total for {shoppingList.length} items
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
      )}

      {shoppingList.length === 0 && (
        <div className="shopping-cart__empty-cart">Your cart is empty</div>
      )}
    </div>
  );
});
