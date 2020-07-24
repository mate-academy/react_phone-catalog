import React from 'react';
import { Basket } from '../interfaces';
import { Phone } from '../interfaces';
import { setBasket, removeItem, deleteItem } from '../store/basket';
import { useDispatch } from 'react-redux';

interface Props {
  goodItem: Basket;
}

export const GoodItem: React.FC<Props> = ({ goodItem }) => {
  const dispatch = useDispatch();
  const handleClickAdd = (goodItem: Phone) => {
    dispatch(setBasket(goodItem))
  }

  const handleClickRemove = (goodItem: Phone) => {
    dispatch(removeItem(goodItem))
  }

  const handleClickDelete = (id: string) => {
    dispatch(deleteItem(id))
  }

  return (
    <li className="goods__item">
      {
        goodItem.goodItem && (
          <>
            <button
              className="goods__delete button button-delete"
              onClick={() => handleClickDelete(goodItem.goodItem.id)}
            >
              x
            </button>
            <img src={goodItem.goodItem.imageUrl} alt={goodItem.goodItem.name} className="goods__img"/>
            <p className="goods__title">{goodItem.goodItem.name}</p>
            <div className="goods__wrapper">
              <button
                className="button button-minus goods__button"
                onClick={() => handleClickRemove(goodItem.goodItem)}
              >
                -
              </button>
              <p>{goodItem.quantity}</p>
              <button
                className="button button-plus goods__button"
                onClick={() => handleClickAdd(goodItem.goodItem)}
              >
                +
              </button>
            </div>
            <p className="goods__price">&#x24;{goodItem.quantity * goodItem.goodItem.price * (1 - goodItem.goodItem.discount / 100)}</p>
          </>
        )
      }

    </li>
  );
}
