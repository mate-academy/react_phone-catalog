import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartProducts } from '../../types/CartProducts';
import classNames from 'classnames';
import { CatalogContext } from '../Contexts/CatalogContext';

type Props = {
  item: CartProducts;
};

export const ProductCard: React.FC<Props> = ({ item }) => {
  const context = useContext(CatalogContext);
  const { cart, deleteFromCart, changeCountProduct } = context;
  const { id, product, quantity } = item;
  const location = useLocation();

  const handlerDeleteFromCart = (productId: number) => {
    if (cart.some(currentProduct => currentProduct.id === productId)) {
      deleteFromCart(productId);
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__row">
        <div
          className="cart__delete"
          onClick={() => handlerDeleteFromCart(id)}
        ></div>
        <div className="cart__photo">
          <Link
            to={`../${product.category}/${product.itemId}`}
            state={{
              location,
            }}
          >
            <img
              className="cart__image"
              src={product.image}
              alt="product photo"
            />
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
            className={classNames('button button--minus', {
              'button--minus--active': quantity !== 1,
            })}
            onClick={() => changeCountProduct(id, -1)}
          ></button>
          <div className="cart__quantity">{quantity}</div>
          <button
            type="button"
            className="button button--plus"
            onClick={() => changeCountProduct(id, 1)}
          ></button>
        </div>
        <div className="cart__price">{`$${product.price * quantity}`}</div>
      </div>
    </div>
  );
};
