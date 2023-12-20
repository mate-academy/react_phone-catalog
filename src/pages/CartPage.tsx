import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/context';
import { CartSummary } from '../components/CartSummary';
import { CartItem } from '../components/CartItem';

export const CartPage = () => {
  const navigate = useNavigate();

  const { cart } = useMyContext();

  const itemsNum = cart.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = cart.reduce((sum, product) => (
    sum + product.quantity * product.product.price
    - (product.product.price * product.product.discount) / 100), 0);

  return (
    <div className="page">
      <button
        type="button"
        className="page__path--back SmallText"
        onClick={() => navigate(-2)}
        data-cy="backButton"
      >
        <img
          alt="arrowTop"
          src="./img/arrowLeft.svg"
          className="page__path--prev"
        />
        Back
      </button>

      {cart.length === 0
        ? (<h1 className="page__title h1">Your cart is empty</h1>)
        : (<h1 className="page__title h1">Cart</h1>)}

      {cart.length > 0 && (

        <div className="page__cart">
          <div className="page__cart--list">
            {cart.map((product) => (
              <CartItem cartItem={product} key={product.id} />
            ))}
          </div>
          <CartSummary itemsNum={itemsNum} totalPrice={totalPrice} />
        </div>

      ) }

    </div>
  );
};
