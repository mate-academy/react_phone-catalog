/* eslint-disable jsx-a11y/control-has-associated-label */
import './cart-item.scss';

export const CartItem = () => {
  return (
    <div className="cart__item">
      <button className="cross__icon icon" type="button" />
      <div className="item__image">
        <img
          src="img/phones/apple-iphone-7/black/00.jpg"
          alt="Apple iPhone 11 Pro Max 64GB Gold"
        />
      </div>
      <p className="item__title">Apple iPhone 11 Pro Max 64GB Gold</p>
      <div className="item-counter">
        <button className="minus-button button" type="button">-</button>
        <p className="item__amount">1</p>
        <button className="plus-button button" type="button">+</button>
      </div>
      <p className="total__price">1090$</p>
    </div>
  );
};
