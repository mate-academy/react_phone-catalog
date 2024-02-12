import './CartItem.scss';

export const CartItem = () => {
  return (
    <div className="cart-item">
      <button
        type="button"
        className="
        cart-item__button
        cart-item__button--delete-button
        "
      >
        x
      </button>

      <img
        src="/img/products/dell-streak-7.0.jpg"
        alt="dell-streak-7.0"
        className="cart-item__product-image"
      />

      <p className="cart-item__product-name">
        Dell Streak 7
      </p>

      <div className="cart-item__count-container">
        <button
          type="button"
          className="
          cart-item__button
          cart-item__count-button
          cart-item__count-button--take-button
          "
        >
          -
        </button>

        <p className="cart-item__item-count">1</p>

        <button
          type="button"
          className="
          cart-item__button
          cart-item__count-button
          cart-item__count-button--add-button
          "
        >
          +
        </button>
      </div>

      <p className="cart-item__product-price">$1099</p>
    </div>
  );
};
