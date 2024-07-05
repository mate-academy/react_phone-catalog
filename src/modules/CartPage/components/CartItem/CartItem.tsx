import React, { useContext } from 'react';
import './CartItem.scss';
import { CartItemType } from '../../../../types/CartItemType';
import { DispatchContext } from '../../../../contexts/AppContext/AppContext';
import { getIconSrc } from '../../../../helpers/getIconSrc';
import {
  ThemeContext,
  ThemeType,
} from '../../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';
import { BASE_URL } from '../../../../services/httpClient';
import { Link } from 'react-router-dom';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { theme } = useContext(ThemeContext);
  const { id, quantity, product } = cartItem;
  const dispatch = useContext(DispatchContext);

  const handleDelete = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const changeQuantity = (itemId: string, delta: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: itemId, delta: delta },
    });
  };

  return (
    <div
      key={product.id}
      className={classNames('cartItem__wrap', {
        dark: theme === ThemeType.DARK,
      })}
    >
      <div className="cartItem__productInfo">
        <button className="cartItem__closeBtn" onClick={() => handleDelete(id)}>
          <img
            className="icon"
            src={getIconSrc('delete-item', theme)}
            alt="delete"
          />
        </button>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className="cartItem__imageWrap"
        >
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="cartItem__image"
          />
        </Link>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className="cartItem__productName"
        >
          {product.name}
        </Link>
      </div>

      <div className="cartItem__cost">
        <div className="cartItem__quantity">
          <button
            className={classNames('cartItem__quantityBtn', {
              dark: theme === ThemeType.DARK,
            })}
            onClick={() => changeQuantity(id, -1)}
          >
            <img
              src={getIconSrc('minus', theme)}
              alt="decrease"
              className="icon"
            />
          </button>
          <p className="cartItem__quantitySum">{quantity}</p>
          <button
            className={classNames('cartItem__quantityBtn', {
              dark: theme === ThemeType.DARK,
            })}
            onClick={() => changeQuantity(id, 1)}
          >
            <img
              src={getIconSrc('plus', theme)}
              alt="increase"
              className="icon"
            />
          </button>
        </div>
        <p className="cartItem__price h3">{`$${product.price}`}</p>
      </div>
    </div>
  );
};
