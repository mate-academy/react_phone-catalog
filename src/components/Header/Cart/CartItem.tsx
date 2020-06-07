import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../redux/cart';
import { ProductPrice } from '../../ProductCard/ProductPrice';


export const CartItem = (props: Product) => {
  const { id, name, imageUrl, price, discount } = props;
  const dispatch = useDispatch();

  const handleDeletingItem = useCallback(
    () => dispatch(deleteFromCart(id)),
    [dispatch, id]
  );

  return (
    <div className="cart-item">
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
          className="cart-item__add-btn"
          aria-label="Add product quantity"
        />
        <span className="cart-item__quantity">1</span>
        <button
          type="button"
          className="cart-item__subtract-btn"
          aria-label="Delete product quantity"
        />
      </div>
      <ProductPrice price={price} discount={discount} />
    </div>
  );
}
