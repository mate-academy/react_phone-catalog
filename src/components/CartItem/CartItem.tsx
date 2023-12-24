/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getCorrectImageUrl } from '../../helpers/getCorrectImageUrl';
import { Item } from '../../types/Item';
import './CartItem.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { getLinkTypeByProduct } from '../../helpers/getLinkTypeByProduct';
import { Error } from '../../types/others/types';

type Props = {
  item: Item;
  setError: React.Dispatch<React.SetStateAction<Error>>;
};

export const CartItem: React.FC<Props> = ({ item, setError }) => {
  const { setCart, cart } = useContext(ProductsContext);

  const quantityMinusButtonHandler
    = (event: React.MouseEvent<HTMLButtonElement>, product: Item) => {
      event.preventDefault();

      if (product.quantity === 1) {
        setError({
          id: Date.now(),
          isError: true,
          type: 'warning',
          text: 'Minimum quantity is 1',
        });
      } else {
        setCart(cart.map(i => {
          if (i.id === product.id) {
            return {
              ...i,
              quantity: (i.quantity || 2) - 1,
            };
          }

          return i;
        }));
      }
    };

  const quantityPlusButtonHandler
    = (event: React.MouseEvent<HTMLButtonElement>, product: Item) => {
      event.preventDefault();

      if (product.quantity === 10) {
        setError({
          id: Date.now(),
          isError: true,
          type: 'warning',
          text: 'Maximum quantity is 10 for 1 order',
        });
      } else {
        setCart(cart.map(i => {
          if (i.id === product.id) {
            return {
              ...i,
              quantity: (i.quantity || 0) + 1,
            };
          }

          return i;
        }));
      }
    };

  const deleteItemHandler
    = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setCart(cart.filter(i => i.id !== item.id));
    }, [cart, setCart]);

  return (
    <Link
      to={`/${getLinkTypeByProduct(item)}/${item.id}`}
      className="CartItem"
    >
      <div className="CartItem__info">
        <button
          data-cy="cartDeleteButton"
          type="button"
          className="CartItem__info-delete"
          onClick={deleteItemHandler}
        >
          <img
            src="icons/cross.svg"
            alt="del"
            className="CartItem__info-delete-icon"
          />
        </button>
        <div className="CartItem__info-image">
          <img
            src={getCorrectImageUrl(item.imageUrl)}
            className="CartItem__info-image-content"
            alt="Product"
          />
        </div>
        <div className="CartItem__info-description">
          <p className="CartItem__info-description-text">
            {item.name}
          </p>
        </div>
      </div>
      <div className="CartItem__pricing">
        <div className="CartItem__pricing-quantity">
          <button
            className="simple-button CartItem__pricing-button
              CartItem__pricing-button--minus"
            type="button"
            onClick={(event) => quantityMinusButtonHandler(event, item)}
          >
            <img
              src="icons/minus.svg"
              alt="-"
              className="CartItem__pricing-button-img
                CartItem__pricing-button-img--minus"
            />
          </button>
          <p
            data-cy="productQauntity"
            className="CartItem__pricing-quantity-value"
          >
            {item.quantity || 'err'}
          </p>
          <button
            className="simple-button CartItem__pricing-button
              CartItem__pricing-button--plus"
            type="button"
            onClick={(event) => quantityPlusButtonHandler(event, item)}
          >
            <img
              src="icons/plus.svg"
              alt="+"
              className="CartItem__pricing-button-img
                CartItem__pricing-button-img--plus"
            />
          </button>
        </div>
        <p className="CartItem__pricing-price">
          {`$${item.price - ((item.price * item.discount) / 100)}`}
        </p>
      </div>
    </Link>
  );
};
