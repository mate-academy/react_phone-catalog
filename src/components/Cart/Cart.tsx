import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export const Cart = () => {
  const [message, setMessage] = useState(false);
  const {
    cartItems,
    removeFromCart,
    cartTotalPrice,
    cartCount,
    plusItem,
    minusItem,
  } = useContext(CartContext);

  return (
    <>
      <div className="cart__items-container">
        {cartItems.map(item => (
          <div key={item.id} className="cart__item">
            <div className="cart__item-info">
              <button
                type="button"
                className="cart__item-delete"
                data-cy="cartDeleteButton"
                onClick={() => removeFromCart(item)}
              >
                <div className="cart__item-delete--cross" />
              </button>

              <div className="cart__image-block">
                <img
                  src={`./new/${item.product.image}`}
                  alt={item.product.name}
                  className="cart__image-block--img"
                />
              </div>

              <Link
                to={`/${item.product.category}/${item.product.itemId}`}
                className="cart__item-link"
              >
                <p className="cart__item-name">{item.product.name}</p>
              </Link>

              <div className="cart__quantity">
                <button
                  type="button"
                  className={classNames('cart__quantity-minus',
                    { 'cart__quantity-minus--disabled': item.quantity === 1 })}
                  onClick={() => minusItem(item)}
                >
                  <div className={classNames('cart__quantity-minus--minus',
                    {
                      'cart__quantity-minus--minus-disabled':
                      item.quantity === 1,
                    })}
                  />
                </button>

                <span className="cart__quantity--quantity">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="cart__quantity-plus"
                  onClick={() => plusItem(item)}
                >
                  <div className="cart__quantity-plus--plus" />
                </button>
              </div>
            </div>

            <p className="cart__price">{`$${item.price}`}</p>

          </div>
        ))}
      </div>

      <div className="cart__total">
        <div className="cart__total-info">
          <p className="cart__total-price">{`$${cartTotalPrice}`}</p>
          <p className="cart__total-items" data-cy="productQauntity">
            {`Total for ${cartCount} items`}
          </p>
        </div>

        <div className="cart__checkout">
          <button
            type="button"
            className="cart__checkout-btn"
            onClick={() => setMessage(true)}
          >
            <p className="cart__checkout-btn--text">Checkout</p>
          </button>
          {message && (
            <div className="notification">
              <p className="notification--text">
                We are sorry, but this feature is not implemented yet.
              </p>
              <button
                type="button"
                className="notification__close"
                onClick={() => setMessage(false)}
              >
                <div className="notification__close--cross" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
