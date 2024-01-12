import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { CartItemType } from '../../types/CartItemType';
import './CartItem.scss';
import { API_URL } from '../../utils/api';

type Props = {
  product: CartItemType,
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    removingFromCart,
    handleIncrease,
    handleDecrease,
  } = useContext(GlobalContext);

  const {
    image,
    name,
    id,
    price,
    category,
  } = product.product;

  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <button
          type="button"
          aria-label="delete item"
          className="cart-item__delete"
          onClick={() => removingFromCart(id)}
        />

        <Link
          className="cart-item__link"
          to={`/${category}/${id}`}
        >
          <div className="cart-item__image--container">
            <img
              src={`${API_URL}${image}`}
              alt={name}
              className="cart-item__image"
            />
          </div>
          <span className="cart-item__title">
            {name}
          </span>
        </Link>
      </div>

      <div className="cart-item__quantity">
        <button
          type="button"
          aria-label="button decrease"
          className="button button--minus"
          disabled={product.quantity === 1}
          onClick={() => handleDecrease(id)}
        />

        <span className="cart-item__quantity--count">
          {product.quantity || 1}
        </span>

        <button
          type="button"
          aria-label="button increase"
          className="button button--plus"
          onClick={() => handleIncrease(id)}
        />
      </div>

      <span className="cart-item__price">{`$${price}`}</span>
    </li>
  );
};
