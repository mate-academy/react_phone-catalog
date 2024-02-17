import './CartTotal.scss';

export const CartTotal = () => {
  return (
    <div className="cart-total">
      <p className="cart-total__total-price">$3000</p>
      <p className="cart-total__description">Total for 3 items</p>
      <button
        type="button"
        className="cart-total__checkout-button"
      >
        Checkout
      </button>
    </div>
  );
};
