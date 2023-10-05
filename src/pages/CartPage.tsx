import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../components/Loader/Loader';
import '../styles/blocks/CartPage.scss';
import { Cart } from '../types/cart';

type Props = {
  carts: Cart[],
  isLoading: boolean,
  deleteCart: (value:Cart) => void;
  addQuantity: (value:Cart) => void;
  subtractQuantity: (value:Cart) => void;
};

const ButtonClassName = (cart: Cart) => cn(
  'button-quantity cart__button-quantity',
  { 'button-quantity--disabled': cart.quantity === 1 },
);

export const CartPage: React.FC<Props> = ({
  carts, isLoading, deleteCart, addQuantity, subtractQuantity,
}) => {
  const [message, setMessage] = useState<boolean>(false);
  const itemNumber = useMemo(() => {
    return carts.reduce((accumulator, cart) => accumulator + cart.quantity, 0);
  }, [carts]);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [message]);

  return (
    <>
      { isLoading ? (
        <Loader />
      ) : (
        <div className="cart-page-container">
          <button
            type="button"
            className="back-button cart-page-container__back-button"
            onClick={() => window.history.back()}
            data-cy="backButton"
          >
            <img
              src="./img/icons/arrowleft.svg"
              alt="#back"
              className="img"
            />
            <span className="icon-navigation-text">Back</span>
          </button>
          {carts.length === 0 ? (
            <h1 className="title cart-page-container__title">
              You cart is empty
            </h1>
          ) : (
            <>
              <h1 className="title cart-page-container__title">Cart</h1>
              <div className="carts-container
              cart-page-container__carts-container"
              >
                <div className="carts">
                  {carts.map(cart => (
                    <div
                      className="cart carts__cart"
                      key={cart.id}
                    >
                      <button
                        type="button"
                        className="button-close cart__button-close"
                        onClick={() => deleteCart(cart)}
                      >
                        <img
                          className="img-close "
                          src="./img/icons/icons_close.svg"
                          alt="#close"
                        />
                      </button>

                      <Link
                        to={`/product/${cart.id}`}
                        className="cart-link"
                        onClick={() => {
                          window.scrollTo({ top: 0 });
                        }}
                      >

                        <img
                          className="img-product cart__img-product"
                          src={cart.imageUrl}
                          alt="#product-img"
                        />

                        <p className="product-name cart__product-name">
                          {cart.name}
                        </p>
                      </Link>

                      <button
                        type="button"
                        className={ButtonClassName(cart)}
                        onClick={() => subtractQuantity(cart)}
                        disabled={cart.quantity === 1}
                      >
                        <img
                          className={cart.quantity === 1 ? 'img' : ''}
                          src="./img/icons/minus.svg"
                          alt="#minus"
                        />
                      </button>

                      <span className="quantity">{cart.quantity}</span>

                      <button
                        type="button"
                        className="button-quantity"
                        onClick={() => addQuantity(cart)}
                      >
                        <img src="./img/icons/plus.svg" alt="#plus" />
                      </button>
                      <span className="price cart__price">
                        {`$${cart.price * cart.quantity}`}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="checkout-container
                carts-container__checkout-container"
                >
                  <h1 className="title checkout-container__title">
                    {`$${carts.reduce(
                      (
                        accumulator, cart,
                      ) => accumulator + cart.price * cart.quantity, 0,
                    )}`}
                  </h1>
                  <p className="total-items" data-cy="productQauntity">
                    {itemNumber === 1 ? `Total for ${itemNumber} item` : `Total for ${itemNumber} items`}
                  </p>
                  <hr className="line checkout-container__line" />
                  {!message ? (
                    <button
                      type="button"
                      className="checkout-button
                  checkout-container__checkout-button"
                      onClick={() => setMessage(true)}
                    >
                      Checkout
                    </button>
                  ) : (
                    <p className="message">
                      We are sorry, but this feature is not implemented yet
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
