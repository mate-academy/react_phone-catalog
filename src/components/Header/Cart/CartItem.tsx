import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, deleteFromCart, subtractQuantity } from '../../../redux/cart';
import { ProductPrice } from '../../ProductCard/ProductPrice';
import { getQuantity } from '../../../redux';

type CartItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discount: number;
  index: number;
};

export const CartItem = (props: CartItemProps) => {
  const { id, name, imageUrl, price, discount, index } = props;
  const dispatch = useDispatch();
  const quantity = useSelector(getQuantity);

  const handleDeletingItem = useCallback(
    () => dispatch(deleteFromCart(id, price)),
    [dispatch, id, price]
  );

  console.log(index)

  return (
    <div
      className="cart-item"
    >
      <button
        type="button"
        className="cart-item__delete-btn"
        aria-label="Delete product"
        onClick={handleDeletingItem}
      />
      <img className="cart-item__image" src={imageUrl} alt={name} />
      <p className="cart-item__title">{name}</p>
      <div className="cart-item__quantity-container">
        <button
          type="button"
          className="cart-item__subtract-btn"
          aria-label="Add product quantity"
          onClick={() => dispatch(subtractQuantity(price))}
          disabled={quantity === 1}
        />
        <span className="cart-item__quantity">{quantity}</span>
        <button
          type="button"
          className="cart-item__add-btn"
          aria-label="Delete product quantity"
          onClick={() => dispatch(addQuantity(price))}
        />
      </div>
      <ProductPrice price={price} discount={discount} />
    </div>
  );
}
