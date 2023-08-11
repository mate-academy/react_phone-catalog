import { Link } from 'react-router-dom';

export const Cart = () => (
  <Link to="/" className="cart header__button">
    <img
      src="./img/icons/shopping-bag.svg"
      alt="Cart button"
      className="cart__icon"
    />
  </Link>
);
