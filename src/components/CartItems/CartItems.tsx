/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './CartItems.scss';
import { GlobalContext } from '../../GlobalContext';

export const CartItems: React.FC = () => {
  const { cartItems, setCartItems } = useContext(GlobalContext);

  const handleDelete = (id: string) => {
    let current = [...cartItems];

    current = current.filter(item => item.id !== id);

    setCartItems(current);
  };

  const handleChangeQnt = (type: string, id: string) => {
    const current = [...cartItems];
    const updated = cartItems.find(item => item.id === id);
    const index = cartItems.findIndex(item => item.id === id);

    if (type === 'plus' && updated) {
      current.splice(
        index, 1, { ...updated, quantity: updated.quantity + 1 },
      );
    } else if (type === 'minus' && updated) {
      current.splice(
        index, 1, { ...updated, quantity: updated.quantity - 1 },
      );
    }

    setCartItems(current);
  };

  return (
    <ul className="CartItems">
      {cartItems.map(item => (
        <li key={item.id} className="CartItems__item">
          <div className="CartItems__left-part">
            <button
              data-cy="cartDeleteButton"
              type="button"
              className="CartItems__delete"
              onClick={() => handleDelete(item.id)}
            />

            <Link
              to={`../${item.product.category}/${item.id}`}
              className="CartItems__link"
            >
              <div className="CartItems__img-container">
                <img
                  className="CartItems__img"
                  src={`_new/${item.product.image}`}
                  alt=""
                />
              </div>

              <div className="CartItems__name-wrapper">
                <span className="CartItems__name">
                  {item.product.name}
                </span>
              </div>
            </Link>
          </div>

          <div className="CartItems__buttons-container">
            <button
              type="button"
              className="CartItems__button"
              disabled={item.quantity === 1}
              onClick={() => handleChangeQnt('minus', item.id)}
            />
            <div className="CartItems__quantity">
              <span>
                {item.quantity}
              </span>
            </div>
            <button
              type="button"
              className="CartItems__button CartItems__button--add"
              onClick={() => handleChangeQnt('plus', item.id)}
            />
          </div>

          <span className="CartItems__price">
            {item.product.price}
          </span>
        </li>
      ))}
    </ul>
  );
};
