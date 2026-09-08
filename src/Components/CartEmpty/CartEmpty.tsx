import './CartEmpty.scss';

export const CartEmpty = () => {
  return (
    <div className="cart-empty-wrapper">
      <p className="cart-empty">Cart is empty</p>
      <div className="cart-empty-photo-wrapper">
        <img
          className="cart-empty-photo"
          src="img/cart-is-empty.png"
          alt="cart empty"
        />
      </div>
    </div>
  );
};
