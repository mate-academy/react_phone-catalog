import { Link } from 'react-router-dom';
import cn from 'classnames';
import './CartPage.scss';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../components/Context/Context';
import { NoResults } from '../../components/NoResults/NoResults';

export const CartPage = () => {
  const {
    cartProducts,
    handleDeleteItem,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useContext(GlobalContext);
  const [visibleNotification, setVisibleNotification] = useState(false);

  const itemsCount = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0);

  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const clickCheckoutButton = () => {
    setVisibleNotification(true);

    setTimeout(() => setVisibleNotification(false), 5000);
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__content">
          <Link to=".." className="cart__button-back" data-cy="backButton">
            <div className="cart__arrow" />
            Back
          </Link>

          <h1 className="cart__title title--h1">Cart</h1>

          {!itemsCount && (
            <div className="cart__empty">
              <NoResults
                message="Your cart is empty"
                description="Take a look at our catalog
            to find someting you may like"
              />
              <img
                src="img/cart-is-empty.png"
                alt="empty cart"
                className="cart__empty-img"
              />
            </div>
          )}

          {itemsCount > 0 && (
            <>
              <div className="cart__items">
                {cartProducts.map(item => (
                  <div className="cart__item" key={item.id}>
                    <button
                      type="button"
                      aria-label="delete button"
                      className="cart__button-delete icon icon--close"
                      data-cy="cartDeleteButton"
                      onClick={() => handleDeleteItem(item.id)}
                    />
                    <Link
                      className="cart__product-link"
                      to={`/phones/${item.itemId}`}
                    >
                      <img
                        src={item.image}
                        alt="product"
                        className="cart__photo"
                      />
                    </Link>
                    <Link
                      className="cart__product-link cart__product-link--name"
                      to={`/phones/${item.itemId}`}
                    >
                      <p className="cart__name">{item.name}</p>
                    </Link>
                    <div className="cart__count-buttons">
                      <button
                        type="button"
                        disabled={item.quantity === 1}
                        className={cn('cart__button icon icon--minus', {
                          'icon--disabled-minus': item.quantity === 1,
                        })}
                        aria-label="minus"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      />
                      {item.quantity}
                      <button
                        type="button"
                        className="cart__button icon icon--plus"
                        aria-label="plus"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      />
                    </div>
                    <p className="cart__price">{`$${item.price}`}</p>
                  </div>
                ))}
              </div>

              <div className="cart__total">
                <p className="cart__total-price">{`$${totalPrice}`}</p>
                <p className="cart__items-count" data-cy="productQauntity">
                  {itemsCount === 1
                    ? 'Total for 1 item'
                    : `Total for ${itemsCount} items`}
                </p>
                <button
                  type="button"
                  className="cart__checkout"
                  onClick={clickCheckoutButton}
                >
                  Checkout
                </button>

                {visibleNotification && (
                  <NoResults
                    description="We are sorry,
                  but this feature is not implemented yet"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
