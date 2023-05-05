import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../helpers/cartHelper';
import { CartItem } from '../types/CartItem';
import { Message } from '../components/Message';

export const CartPage = () => {
  const navigate = useNavigate();
  const [onCheckout, setOnCheckout] = useState(false);
  const {
    cartItems,
    getTotalQuantity,
    deleteCartItem,
    incrementCounter,
    decrementCounter,
  } = useContext(CartContext);

  const backHandler = () => navigate(-1);

  const backOnCartHandler = () => setOnCheckout(false);

  const onCheckoutHandler = () => setOnCheckout(true);

  const getProductPrice = (cartItem: CartItem) => {
    if (cartItem.product.discount) {
      return (cartItem.product.price
        - (cartItem.product.price * cartItem.product.discount) / 100)
        * cartItem.quantity;
    }

    return cartItem.product.price * cartItem.quantity;
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, current) => sum + getProductPrice(current), 0);
  };

  const deleteCartItemHandler = (productId: string) => () => {
    deleteCartItem(productId);
  };

  const addCounterHandler = (productId: string) => () => {
    incrementCounter(productId);
  };

  const subtractCounterHandler = (productId: string) => () => {
    decrementCounter(productId);
  };

  return (
    <div className="cart-page">
      <button
        className="cart-page__back-button button button--back"
        type="button"
        data-cy="backButton"
        onClick={onCheckout ? backOnCartHandler : backHandler}
      >
        <span className="icon icon--left" />
        <div className="button__back-text">Back</div>
      </button>

      <section>
        <h1 className="cart-page__title">Cart</h1>
        {!!cartItems.length && !onCheckout && (
          <div className="cart-page__container">
            <div className="cart-page__products">
              {cartItems.map(item => (
                <div className="cart-page__product" key={item.id}>
                  <button
                    className="cart-page__delete-button button button--delete"
                    type="button"
                    data-cy="cartDeleteButton"
                    onClick={deleteCartItemHandler(item.id)}
                  >
                    <span className="icon icon--close-cart-item" />
                  </button>
                  <img
                    src={`./${item.product.imageUrl}`}
                    alt={item.product.name}
                    className="cart-page__img"
                  />
                  <p className="cart-page__name">{item.product.name}</p>
                  <div className="cart-page__counter">
                    <button
                      className="button button--counter"
                      type="button"
                      data-cy="cartDeleteButton"
                      onClick={subtractCounterHandler(item.id)}
                      disabled={item.quantity === 1}
                    >
                      &#8722;
                    </button>
                    <div>{item.quantity}</div>
                    <button
                      className="button button--counter"
                      type="button"
                      data-cy="cartDeleteButton"
                      onClick={addCounterHandler(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <h2>{`$${getProductPrice(item)}`}</h2>
                </div>
              ))}
            </div>
            <div className="cart-page__total">
              <h1>{`$${getTotalPrice()}`}</h1>
              <div
                className="cart-page__total-quantity"
                data-cy="productQauntity"
              >
                {`Total for ${getTotalQuantity()} items`}
              </div>
              <div className="cart-page__button">
                <button
                  type="button"
                  className="button button--add"
                  onClick={onCheckoutHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        {!cartItems.length && (
          <Message message="Your cart is empty" isError={false} />
        )}
        {onCheckout && (
          <Message
            message="We are sorry, but this feature is not implemented yet"
            isError={false}
          />
        )}
      </section>
    </div>
  );
};
