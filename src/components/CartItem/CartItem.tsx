import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import './CartItem.scss';
import { ProductItem } from '../../types/ProductItem';
import { removeItem, addAmount, removeAmount } from '../../features/cartSlice';
import { localClient } from '../../helpers/localClient';

interface CartItemProps {
  product: ProductItem;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const handleDelete = () => {
    const listWithRemovedItem = cartItems.filter(item => {
      return item.id !== product.id;
    });

    localClient.write('cart', listWithRemovedItem);

    dispatch(removeItem(product));
  };

  const handleAddOne = () => {
    dispatch(addAmount(product));

    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, amount: (item.amount || 0) + 1 };
      }

      return item;
    });

    localClient.write('cart', updatedCartItems);
  };

  const handleDeleteOne = () => {
    dispatch(removeAmount(product));

    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id && item.amount && item.amount > 0) {
        return { ...item, amount: item.amount - 1 };
      }

      return item;
    });

    localClient.write('cart', updatedCartItems);
  };

  return (
    <div className="cart-card">
      { /* eslint-disable-next-line */}
      <button
        onClick={handleDelete}
        className="cart-card__delete"
        data-cy="cartDeleteButton"
      />
      <img
        src={`${product.image}`}
        alt={product.name}
        className="cart-card__image"
      />

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="cart-card__title"
      >
        {`${product.name} (iMT9G2FS/A)`}
      </Link>

      <div className="cart-card__actions">
        { /* eslint-disable-next-line */}
        <button
          onClick={handleDeleteOne}
          disabled={product.amount === 1}
          className={cn({
            'cart-card__actions__button': true,
            'cart-card__actions__button--delete': true,
            'cart-card__actions__button--disabled': product.amount === 1,
          })}
        />
        <div className="cart-card__actions__quantity">
          {product.amount}
        </div>
        { /* eslint-disable-next-line */}
        <button
          onClick={handleAddOne}
          disabled={product.amount === 99}
          className={cn({
            'cart-card__actions__button': true,
            'cart-card__actions__button--add': true,
            'cart-card__actions__button--disabled': product.amount === 99,
          })}
        />
      </div>

      <div className="cart-card__prices">
        <span
          className="cart-card__prices-price
          cart-card__prices-price--current"
        >
          {`$${product.price}`}
        </span>
      </div>

    </div>
  );
};

export default CartItem;
