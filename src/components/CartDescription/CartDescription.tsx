import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/Products';
import { API_PRODUCT_URL } from '../../helpers/helper';
import './CartDescription.scss';

type Props = {
  phone: Product,
  handleDeleteClick: (name: string) => void,
  updateCart: (updatedCart: Product[]) => void,
};

export const CartDescription: React.FC<Props> = ({
  phone,
  handleDeleteClick,
  updateCart,
}) => {
  const {
    image, name, price, quantity,
  } = phone;
  const [count, setCount] = useState(quantity || 1);

  useEffect(() => {
    const cartItems = localStorage.getItem('cart');
    const cartArray = cartItems ? JSON.parse(cartItems) : [];
    const updatedCartArray = cartArray.map((item: Product) => {
      if (item.id === phone.id) {
        return { ...item, quantity: count };
      }

      return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCartArray));

    updateCart(updatedCartArray);
  }, [count]);

  return (
    <div className="column-cart-description">
      <div className="column-cart-description__content">
        <button
          type="button"
          className="column-cart-description__close"
          onClick={() => handleDeleteClick(name)}
          data-cy="cartDeleteButton"
        >
          <div className="fa-icon__cross">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </button>
        <div className="column-cart-description__image">
          <img
            src={API_PRODUCT_URL + image}
            alt="PhoneImage"
            className="column-cart-description__img"
          />
        </div>
        <div className="column-cart-description__title">{name}</div>
        <div className="column-cart-description__add-buttons">
          <button
            type="button"
            className={classNames({
              'column-cart-description__button': true,
              'column-cart-description_remove': true,
            })}
            onClick={() => {
              if (count > 1) {
                setCount(prev => prev - 1);
              }
            }}
          >
            -
          </button>
          <div className="column-cart-description__count">{count}</div>
          <button
            type="button"
            className={classNames({
              'column-cart-description__button': true,
              'column-cart-description_add': true,
            })}
            onClick={() => {
              if (count >= 1) {
                setCount(prev => prev + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <div className="column-cart-description__price">
          $
          {price * count}
        </div>
      </div>
    </div>
  );
};
