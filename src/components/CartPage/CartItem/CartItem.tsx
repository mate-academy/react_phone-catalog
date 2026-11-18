/* eslint-disable max-len */

import { Link } from 'react-router-dom';
import './CartItem.scss';
import { Product } from '../../../types/Product';
import { useCart } from '../../../context/CartContext';

type Props = {
  product: Product;
};

export const CartItem = ({ product }: Props) => {
  const { cart, changeQuantity, deleteCart } = useCart();

  const cartItem = cart.find(item => item.id === product.itemId);
  const productCount = cartItem?.quantity ?? 1;

  return (
    <div className="cart-card">
      <div className="cart-card__content">
        <section className="cart-card__information">
          <svg
            onClick={() => {
              deleteCart?.(product.itemId);
            }}
            className="cart-card__delete"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              className="cart-card__delete--path"
              d="M9.13807 1.13807C9.39842 0.877722 9.39842 0.455612 9.13807 0.195262C8.87772 -0.0650874 8.45561 -0.0650874 8.19526 0.195262L4.66667 3.72386L1.13807 0.195262C0.877722 -0.0650874 0.455612 -0.0650874 0.195262 0.195262C-0.0650874 0.455612 -0.0650874 0.877722 0.195262 1.13807L3.72386 4.66667L0.195262 8.19526C-0.0650874 8.45561 -0.0650874 8.87772 0.195262 9.13807C0.455612 9.39842 0.877722 9.39842 1.13807 9.13807L4.66667 5.60948L8.19526 9.13807C8.45561 9.39842 8.87772 9.39842 9.13807 9.13807C9.39842 8.87772 9.39842 8.45561 9.13807 8.19526L5.60948 4.66667L9.13807 1.13807Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>

          <Link to={`/${product.category}/${product.itemId}`}>
            <img
              className="cart-card__information--img"
              src={product.image}
              alt=""
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            />
          </Link>

          <div className="cart-card__information--name">
            <Link
              className="cart-card__information--name-link"
              to={`/${product.category}/${product.itemId}`}
            >
              {product.name}
            </Link>
          </div>
        </section>

        <div className="cart-card__content--right">
          <section className="cart-card__actions">
            <div className="cart-card__actions--buttons">
              <button
                className={`cart-card__actions--button-decrease ${productCount <= 1 ? 'button--disabled' : ''}`}
                disabled={productCount <= 1}
                onClick={() => {
                  changeQuantity(product.itemId, -1);
                }}
              >
                -
              </button>

              <div className="cart-card__actions--count">{productCount}</div>

              <button
                className="cart-card__actions--button-increase"
                onClick={() => {
                  changeQuantity(product.itemId, 1);
                }}
              >
                +
              </button>
            </div>
          </section>

          <section className="cart-card__amount">
            {product.price < product.fullPrice ? (
              <>
                <div className="cart-card__amount--price">
                  {`$${product.price * productCount}`}
                </div>
                <div className="cart-card__amount--full-price">
                  {`$${product.fullPrice * productCount}`}
                </div>
              </>
            ) : (
              <div className="cart-card__amount--price">
                {`$${product.price * productCount}`}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
