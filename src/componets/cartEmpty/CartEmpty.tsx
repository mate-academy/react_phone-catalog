import './CartEmpty.scss';
import { Link } from 'react-router-dom';
import cartEmpty from '../../img/cart.png';

export const CartEmpty = () => {
  return (
    <div className="cartEmpty">
      <div className="cartEmpty__image-container">
        <img
          src={cartEmpty}
          alt="cart empty"
          className="cartEmpty__image"
        />
      </div>
      <h1 className="cartEmpty__title">Your cart is currently empty</h1>
      <p className="cartEmpty__description">
        Before proceed to checkout, you must add some products to your cart.
      </p>
      <p className="cartEmpty__description">
        You will find a lot of interesting products
        on our &quot;Phones&quot; page
      </p>
      <div className="cartEmpty__button-container">
        <button
          type="button"
          className="cartEmpty__button"
        >
          <Link
            to="/phones"
            className="cartEmpty__link"
          >
            Return to Phones
          </Link>
        </button>
      </div>
    </div>
  );
};
