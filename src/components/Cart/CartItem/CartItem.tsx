import { FC } from 'react';
import { useDispatch } from 'react-redux';
import './CartItem.scss';
import { ProductOfCart } from '../../../types/ProductOfCart';
import { actions } from '../../../features/cart';
import { getProductPrices } from '../../../helpers/getProductPrices';

type Props = {
  cartItem: ProductOfCart;
};

export const CartItem: FC<Props> = ({ cartItem }) => {
  const { quantity, product } = cartItem;
  const dispatch = useDispatch();

  const { currentPrice } = getProductPrices(product);

  const removeCartItem = () => {
    dispatch(actions.remove(cartItem));
  };

  const increaseQuantity = () => {
    dispatch(actions.increase(cartItem));
  };

  const decreaseQuantity = () => {
    dispatch(actions.decrease(cartItem));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__product">
        <button
          type="button"
          aria-label="delete-item"
          className="cart-item__delete"
          data-cy="cartDeleteButton"
          onClick={removeCartItem}
        />
        <img
          src={cartItem.product.imageUrl}
          alt="cart-item"
          className="cart-item__img"
        />
        <h4 className="cart-item__title">
          {product.name}
        </h4>
      </div>
      <div
        className="cart-item__quantity-and-price"
        data-cy="productQauntity"
      >
        <div className="cart-item__quantity-container">
          <button
            type="button"
            aria-label="decrement-products-in-cart"
            className="cart-item__button cart-item__minus"
            onClick={decreaseQuantity}
          />
          <span
            data-cy="productQuantity"
            className="cart-item__quantity"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="increment-products-in-cart"
            className="cart-item__button cart-item__plus"
            onClick={increaseQuantity}
          />
        </div>
        <span className="cart-item__price">{`$${currentPrice}`}</span>
      </div>
    </div>
  );
};
