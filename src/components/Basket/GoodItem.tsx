import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Basket, Product } from '../../interfaces';

import { setBasket, removeItem, deleteItem } from '../../store/basket';

interface Props {
  goodItem: Basket;
}

export const GoodItem: React.FC<Props> = ({ goodItem }) => {
  const dispatch = useDispatch();
  const handleClickAdd = (good: Product) => {
    dispatch(setBasket(good));
  };

  const handleClickRemove = (good: Product) => {
    dispatch(removeItem(good));
  };

  const handleClickDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  return (
    <li className="goods__item">
      {
        goodItem.goodItem && (
          <>
            <button
              type="button"
              className="goods__delete button button-delete"
              onClick={() => handleClickDelete(goodItem.goodItem.id)}
            >
              x
            </button>
            <img src={goodItem.goodItem.imageUrl} alt={goodItem.goodItem.name} className="goods__img" />
            <Link to={`/phones/${goodItem.id}`}>
              <p className="goods__title">{goodItem.goodItem.name}</p>
            </Link>
            <div className="goods__wrapper">
              <button
                type="button"
                className="button button-minus goods__button"
                onClick={() => handleClickRemove(goodItem.goodItem)}
              >
                +
              </button>
              <p>{goodItem.quantity}</p>
              <button
                type="button"
                className="button button-plus goods__button"
                onClick={() => handleClickAdd(goodItem.goodItem)}
              >
                +
              </button>
            </div>
            <p className="goods__price">
              &#x24;
              {goodItem.quantity * goodItem.goodItem.price
                * (1 - goodItem.goodItem.discount / 100)}
            </p>
          </>
        )
      }
    </li>
  );
};
