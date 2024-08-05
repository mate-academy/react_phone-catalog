import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { CartProducts } from '../../types/CartProducts';
import { ProductsContext } from '../../context/ProductsContext';
import './CartItem.scss';

type Props = {
  item: CartProducts;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const location = useLocation();

  const context = useContext(ProductsContext);
  const { cart, deleteFromCart, changeCountProduct } = context;
  const { id, product, quantity } = item;

  const handlerDeleteFromCart = (productId: number) => {
    if (cart.some(currentProduct => currentProduct.id === productId)) {
      deleteFromCart(productId);
    }
  };

  return (
    <div className="cart">
      <div className="cart__item">
        <div className="cart__row">
          <button
            type="button"
            aria-label="Delete item from cart"
            className="cart__delete"
            onClick={() => handlerDeleteFromCart(id)}
          />
          <div className="cart__photo">
            <Link
              to={`../${product.category}/${product.itemId}`}
              state={{
                location,
              }}
            >
              <img className="cart__image" src={product.image} alt="product" />
            </Link>
          </div>
          <div className="cart__name">
            <Link
              to={`../${product.category}/${product.itemId}`}
              state={{
                location,
              }}
              className="cart__link"
            >
              {product.name}
            </Link>
          </div>
        </div>
        <div className="cart__row">
          <div className="cart__count">
            <button
              type="button"
              className={cn('button button--minus', {
                'button--minus--active': quantity !== 1,
              })}
              onClick={() => changeCountProduct(id, -1)}
              aria-label="Decrease quantity"
            />
            <div className="cart__quantity">{quantity}</div>
            <button
              type="button"
              className="button button--plus"
              onClick={() => changeCountProduct(id, 1)}
              aria-label="Increase quantity"
            />
          </div>
          <div className="cart__price">{`$${product.price}`}</div>
        </div>
      </div>
    </div>
  );
};
