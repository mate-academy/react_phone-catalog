import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import './Cart.scss';
import cross from '../../Icons/closeGray.svg';
import { CartItem } from '../../types/CartItem';
import { NoResults } from '../NoResultsPage/NoResults';
import { CheckoutModal } from '../../components/CheckoutModal/CheckoutModal';

type Props = {
  cartProducts: CartItem[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const Cart: React.FC<Props> = ({ cartProducts, setCartProducts }) => {
  const [modal, setModal] = useState(false);

  const calculateTotal = (): number => {
    let total = 0;

    cartProducts.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  const handleRemoveFromCart = (itemId: string) => {
    const updatedCartItems = cartProducts.filter(
      (cartItem) => cartItem.id !== itemId,
    );

    setCartProducts(updatedCartItems);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedCartItems = cartProducts.map((cartItem) => {
      if (cartItem.id === itemId) {
        return {
          ...cartItem,
          quantity: Math.max(1, newQuantity),
        };
      }

      return cartItem;
    });

    setCartProducts(updatedCartItems);
  };

  return (
    <div className="cart">
      <div className="cart__content">
        <BackButton />

        <h1 className="cart__title">
          Cart
        </h1>

        {cartProducts.length === 0 ? (<NoResults />) : (
          <div className="cart__main">
            <div className="cart__items">
              {cartProducts.map(cartItem => (
                <div className="cart__wrapper" key={cartItem.id}>
                  <button
                    type="button"
                    className="cart__delete"
                    onClick={() => handleRemoveFromCart(cartItem.id)}
                    data-cy="cartDeleteButton"
                  >
                    <img src={cross} alt="cross" className="cart__cross" />
                  </button>

                  <img src={`new/${cartItem.product.image}`} alt="phone" className="cart__image" />

                  <Link
                    to={`/phones/${cartItem.product.phoneId}`}
                    className="cart__name page__link"
                  >
                    {cartItem.product.name}
                  </Link>

                  <div className="cart__buttons">
                    <button
                      type="button"
                      className="cart__button cart__button--minus"
                      onClick={() => handleQuantityChange(
                        cartItem.id, cartItem.quantity - 1,
                      )}
                      disabled={cartItem.quantity === 1}
                    >
                      <p hidden>
                        minus
                      </p>
                    </button>

                    <p className="cart__count">
                      {cartItem.quantity}
                    </p>

                    <button
                      type="button"
                      className="cart__button cart__button--plus"
                      onClick={() => handleQuantityChange(
                        cartItem.id, cartItem.quantity + 1,
                      )}
                    >
                      <p hidden>
                        plus
                      </p>
                    </button>
                  </div>

                  <p className="cart__price">
                    $
                    {cartItem.product.price}
                  </p>
                </div>
              ))}
            </div>

            {!!cartProducts.length && (
              <>
                <div className="cart__checkout checkout">
                  <div className="checkout__wrapper">
                    <h1
                      className="checkout__total"
                      data-cy="productQuantity"
                    >
                      $
                      {calculateTotal()}
                    </h1>

                    <p className="checkout__subtitle">
                      Total for
                      {' '}
                      {cartProducts.length}
                      {' '}
                      items
                    </p>

                    <button
                      type="button"
                      className="checkout__button"
                      onClick={() => setModal(true)}
                    >
                      Checkout
                    </button>
                  </div>

                  {modal && <CheckoutModal />}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
