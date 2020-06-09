import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuantity, deleteFromCart, subtractQuantity } from '../../redux/cart';
import { ProductPrice } from '../ProductCard/ProductPrice';
import { getCartItems } from '../../redux';
import { PRODUCT_PATHS } from '../../common/constants';

export const CartItem = (props: Product) => {
  const {
    id, name, type, imageUrl, price, discount,
  } = props;
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const cartItem = useMemo(
    () => cartItems.find(item => item.id === id)!,
    [cartItems, id],
  );

  const handleDeletingItem = useCallback(
    () => dispatch(deleteFromCart(id, price)),
    [dispatch, id, price],
  );

  const handleAdding = useCallback(
    () => dispatch(addQuantity(id, price)),
    [dispatch, id, price],
  );

  const handleSubtracting = useCallback(
    () => dispatch(subtractQuantity(id, price)),
    [dispatch, id, price],
  );

  const buttonDisabled = useMemo(
    () => cartItem.quantity === 1,
    [cartItem.quantity],
  );

  return (
    <div className="cart-item">
      <button
        type="button"
        className="cart-item__delete-btn"
        aria-label="Delete product"
        onClick={handleDeletingItem}
      />
      <Link
        to={`/${PRODUCT_PATHS[type]}/${id}`}
        className="cart-item__link"
      >
        <img className="cart-item__image" src={imageUrl} alt={name} />
      </Link>
      <p className="cart-item__title">{name}</p>
      <div className="cart-item__quantity-container">
        <button
          type="button"
          className="cart-item__subtract-btn"
          aria-label="Add product quantity"
          onClick={handleSubtracting}
          disabled={buttonDisabled}
        />
        <span className="cart-item__quantity">{cartItem.quantity}</span>
        <button
          type="button"
          className="cart-item__add-btn"
          aria-label="Delete product quantity"
          onClick={handleAdding}
        />
      </div>
      <ProductPrice price={price} discount={discount} />
    </div>
  );
};
