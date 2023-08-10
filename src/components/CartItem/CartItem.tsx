import { useContext } from 'react';
import { Phone } from '../../types/phone';
import { DispatchContext, StateContext } from '../Store';
import './style.scss';

type Props = {
  id: string,
  product: Phone,
  quantity: number,
  discount: boolean,
};

export const CartItem: React.FC<Props> = ({
  product,
  quantity = 1,
  id,
  discount = true,
}) => {
  const {
    image,
    price,
    fullPrice,
    name,
  } = product;

  const dispatch = useContext(DispatchContext);
  const { cartItems } = useContext(StateContext);

  const realPrice = discount ? price : fullPrice;

  const removeItem = (idItem: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: cartItems.filter((cart) => cart.id !== idItem),
    });
  };

  const changeQuantity = (value: 'increase' | 'decrease') => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: cartItems.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            quantity: (
              value === 'increase'
                ? cart.quantity + 1
                : cart.quantity - 1
            ),
          };
        }

        return cart;
      }),
    });
  };

  const totalItemCost = realPrice * quantity;

  return (
    <div className="cartItem">
      <div className="cartItem__block">
        <button
          className="cartItem__buttonRemove"
          type="button"
          aria-label="remove"
          data-cy="cartDeleteButton"
          onClick={() => removeItem(id)}
        />

        <div className="cartItem__imgContainer">
          <img
            src={`_new/${image}`}
            alt=""
            className="cartItem__img"
          />
        </div>

        <p className="cartItem__title">
          {name}
        </p>
      </div>
      <div className="cartItem__block cartItem__block--next">
        <div className="cartItem__buttons">
          <button
            className="cartItem__button cartItem__button--decrease"
            type="button"
            aria-label="decrease"
            disabled={quantity === 1}
            onClick={() => changeQuantity('decrease')}
          />
          <span>
            {quantity}
          </span>
          <button
            className="cartItem__button cartItem__button--increase"
            type="button"
            aria-label="increase"
            onClick={() => changeQuantity('increase')}
          />
        </div>

        <div className="cartItem__price">
          {`$${totalItemCost}`}
        </div>
      </div>
    </div>
  );
};
