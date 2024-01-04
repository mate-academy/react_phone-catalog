/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartPage.scss';
import { Link } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';

import { BASE_URL } from '../../api/api';
import { CartItemType, GlobalContext } from '../../store';
import { BackButton } from '../../components/BackButton';
import { NotImpementFeature } from '../../components/NotImpementFeature';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, dispatch } = useContext(GlobalContext);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, product) => sum + product.price * product.amount, 0,
    );
  }, [cart]);

  const countProductInCart = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.amount, 0);
  }, [cart]);

  const changeAmount = (product: CartItemType, sign: number) => {
    const changedProduct = { ...product };
    const index = cart.findIndex(item => item.id === product.id);

    changedProduct.amount += sign;

    const newCart = [...cart];

    newCart.splice(index, 1, changedProduct);

    dispatch({ type: 'UPDATE_AMOUNT', payload: newCart });
  };

  const increaseAmount = (product: CartItemType) => changeAmount(product, 1);
  const decreaseAmount = (product: CartItemType) => changeAmount(product, -1);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  };

  return (
    <div className="cart-page">
      <BackButton />

      <h1 className="cart-page__title">Cart</h1>

      {!cart.length ? (
        <div className="empty">
          <p className="empty__message">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="cart-page__content">
          <ul className="cart-page__list">
            {cart.map((product) => {
              const {
                id,
                itemId,
                category,
                name,
                image,
                price,
                amount,
              } = product;

              return (
                <li key={id} className="list-item">
                  <div className="list-item__left-container">
                    <button
                      type="button"
                      data-cy="cartDeleteButton"
                      className="list-item__button-delete"
                      onClick={() => dispatch(
                        { type: 'DELETE_PRODUCT', payload: product },
                      )}
                    >
                      <div className="icon icon-cross" />
                    </button>

                    <div className="list-item__photo">
                      <img
                        src={`${BASE_URL}/${image}`}
                        alt="Product"
                        className="list-item__photo_img"
                      />
                    </div>

                    <Link
                      to={`/${category}/${itemId}`}
                      className="list-item__name"
                    >
                      {name}
                    </Link>
                  </div>

                  <div className="list-item__right-container">
                    <div className="list-item__counter">
                      <button
                        type="button"
                        className="list-item__counter_button"
                        onClick={() => decreaseAmount(product)}
                        disabled={amount === 1}
                      >
                        <div className="icon icon-minus" />
                      </button>

                      <p className="list-item__counter_amount">
                        {amount}
                      </p>

                      <button
                        type="button"
                        className="list-item__counter_button"
                        onClick={() => increaseAmount(product)}
                      >
                        <div className="icon icon-plus" />
                      </button>
                    </div>

                    <p className="list-item__price">{`$${price}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart-page__checkout">
            <div className="cart-page__checkout_total">
              <p className="cart-page__checkout_total-price">{`$${totalPrice}`}</p>
              <p
                data-cy="productQauntity"
                className="cart-page__checkout_total-amount"
              >
                {countProductInCart === 1
                  ? 'Total for 1 item'
                  : `Total for ${countProductInCart} items`}
              </p>
            </div>

            <button
              type="button"
              className="cart-page__checkout-button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (<NotImpementFeature onClose={setIsModalOpen} />)}
    </div>
  );
};
