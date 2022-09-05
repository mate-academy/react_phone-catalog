import './Item.scss';
import React from 'react';
import { Phone } from '../../types/Phone';

type Props = {
  item: Phone,
  addFavorite: CallableFunction,
  addWithdraw: CallableFunction,
};

export const Item: React.FC<Props> = ({
  item,
  addFavorite,
  addWithdraw,
}) => {
  const buttonHandle = (place: string) => {
    if (place === 'favorite') {
      addFavorite(item.id);
    } else if (place === 'withdraw') {
      addWithdraw(item.id);
    }
  };

  return (
    <div className="item">
      <div className="item__header">
        <div className="item__photo-container">
          {/* <img
            src={item.imageUrl}
            alt={item.id}
            className="item__photo"
          /> */}
        </div>

        <h2 className="item__title">
          {item.name}
        </h2>
      </div>

      <div className="item__body">
        <div className="item__price">
          {item.discount
            ? (
              <>
                <p className="item__counted">
                  {Math.ceil(item.price * ((100 - item.discount) / 100))}
                </p>

                <p className="item__initial-price">
                  {item.price}
                </p>
              </>
            )
            : (
              <p className="item__counted">
                {item.price}
              </p>
            )}
        </div>

        <div className="item__specs specs">
          <ul className="item__specs specs__list">
            <li className="specs__item">
              <p className="specs__name">
                Screen
              </p>
              <p className="specs__value">
                {item.screen}
              </p>
            </li>
            <li className="specs__item">
              <p className="specs__name">
                Capacity
              </p>
              <p className="specs__value">
                {item.capacity}
              </p>
            </li>
            <li className="specs__item">
              <p className="specs__name">
                RAM
              </p>
              <p className="specs__value">
                {item.ram}
              </p>
            </li>
          </ul>
        </div>

        <div className="item__buttons">
          <button
            type="button"
            className="item__buy"
            onClick={() => buttonHandle('withdraw')}
          >
            Add to cart
          </button>

          <button
            type="button"
            className="item__favorite"
            onClick={() => buttonHandle('favorite')}
          >
            <img src={`/img/ShopItem/favorite${item.favorite ? '(filled)' : ''}.svg`} alt="add to favorite" />
          </button>
        </div>
      </div>
    </div>
  );
};
