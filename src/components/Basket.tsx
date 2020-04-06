import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { BackPath } from './BackPath';

interface Props {
  basket: Basket[];
  setBasket: (basket: Basket[]) => void;
}

const BasketTemplate: FC<Props> = ({
  basket,
  setBasket,
}) => {
  const removeItem = (id: string): void => {
    setBasket([...basket.filter(item => item.id !== id)]);
  };

  const onIncrement = (id: string): void => {
    setBasket([...basket.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    })]);
  };

  const onDecrement = (id: string): void => {
    setBasket([...basket.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    })]);
  };

  if (basket.length > 0) {
    return (
      <div className="basket">
        <BackPath />
        <h2>Cart</h2>

        <ul>
          {basket.length && (basket.map(item => (
            <li className="basket__item" key={item.id}>
              <button
                className="basket__remove"
                type="button"
                onClick={() => {
                  removeItem(item.id);
                }}
              />
              <p className="basket__name">{item.id}</p>
              <button
                className="basket__counter basket__counter--minus"
                type="button"
                onClick={() => onDecrement(item.id)}
                disabled={item.quantity === 1}
              />
              <p className="basket__quantity">{`${item.quantity}`}</p>
              <button
                className="basket__counter basket__counter--plus"
                type="button"
                onClick={() => onIncrement(item.id)}
              />
              <Link
                className="link"
                to={`/phones/${item.id}`}
              >
                <p>See details</p>
              </Link>
            </li>
          )))}
        </ul>
      </div>
    );
  }

  return (
    <div className="basket">
      <BackPath />
      <h2>Cart</h2>
      <p>Your cart is empty...</p>
    </div>
  );
};

const mapStateToProps = (
  state: {
    basketReducer: BasketState;
  },
) => ({
  basket: state.basketReducer.basket,
});

const mapDispatchToProps = {
  setBasket: actions.setBasket,
};

export const Basket = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasketTemplate);
