import './CartEmpty.scss';

export const CartEmpty = () => {
  return (
    <>
      <p className="cart-empty">Cart is empty</p>
      <div className="cart-empty-photo-wrapper">
        <img
          className="cart-empty-photo"
          src="public/img/cart-is-empty.png"
          alt="cart empty"
        />
      </div>
    </>
  );
};
