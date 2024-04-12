import { useAppSelector } from '../../app/hooks';
import { calcTotalCartPrice } from '../../utils/calcTotalCartPrice';
import './checkout.scss';

type CheckoutProps = {
  setActive: (type: boolean) => void,
};

export const Checkout: React.FC<CheckoutProps> = ({ setActive }) => {
  const cart = useAppSelector(state => state.cart);
  const totalItemsInCart = cart.cartItems.length;
  const totalPrice = calcTotalCartPrice(cart.cartItems);

  return (
    <div className="priceContainer">
      <h1 className="priceContainer__totalPrice">{`$${totalPrice}`}</h1>
      <p className="priceContainer__info">
        {`Total for ${totalItemsInCart} items`}
      </p>
      <button
        type="button"
        className="priceContainer__btn"
        onClick={() => setActive(true)}
      >
        Checkout
      </button>
    </div>
  );
};
