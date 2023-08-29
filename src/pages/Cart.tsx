/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CartItem } from '../types/CartItem';
import { LocalContext } from '../LocalContext';
import { NoResults } from '../components/NoResults';
import { Back } from '../components/Back';

export const Cart = () => {
  const { cart, setCart } = useContext(LocalContext);
  const [checkout, setCheckout] = useState(false);

  const totalAmount = useMemo(() => {
    return cart.reduce((prev, card) => (
      prev + (card.product.price * card.quantity)
    ), 0);
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((prev, card) => prev + card.quantity, 0);
  }, [cart]);

  const handleDelete = (id: string) => {
    setCart(cart.filter(card => card.id !== id));
  };

  const handleMinus = (card: CartItem) => {
    setCart(cart.map(item => {
      if (item.id === card.id) {
        return {
          ...card,
          quantity: card.quantity - 1,
        };
      }

      return item;
    }));
  };

  const handlePlus = (card: CartItem) => {
    setCart(cart.map(item => {
      if (item.id === card.id) {
        return {
          ...card,
          quantity: card.quantity + 1,
        };
      }

      return item;
    }));
  };

  return (
    <main className="main">
      <div className="main__header">
        <Back />

        <h1 className="main__title">Cart</h1>
      </div>

      {cart.length === 0 && (<NoResults category="cart" />)}

      {cart.length !== 0 && (
        <section className="main__cart cart">
          <div className="cart__list">
            {cart.map(card => {
              const {
                id,
                quantity,
                product,
              } = card;
              const {
                image,
                name,
                price,
                phoneId,
              } = product;

              return (
                <div className="cart__card" key={id}>
                  <button
                    type="button"
                    className="cart__close"
                    onClick={() => handleDelete(id)}
                    data-cy="cartDeleteButton"
                  />

                  <Link
                    to={`/phones/${phoneId}`}
                    className="cart__image-wrapper"
                  >
                    <img
                      className="cart__image"
                      src={`./_new/${image}`}
                      alt={name}
                    />
                  </Link>

                  <Link
                    to={`/phones/${phoneId}`}
                    className="cart__name"
                  >
                    {`${name}`}
                  </Link>

                  <div className="cart__buttons">
                    <button
                      type="button"
                      className={classNames(
                        'cart__button cart__button--minus',
                        {
                          'cart__button--disabled':
                            quantity === 1,
                        },
                      )}
                      onClick={() => handleMinus(card)}
                      disabled={quantity === 1}
                    />

                    <span className="cart__count">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      className="cart__button cart__button--plus"
                      onClick={() => handlePlus(card)}
                    />
                  </div>

                  <h2 className="cart__card-price">
                    {`$${price}`}
                  </h2>
                </div>
              );
            })}
          </div>

          <div className="cart__total">
            <h1 className="cart__title">
              {`$${totalAmount}`}
            </h1>

            <div className="cart__description" data-cy="productQauntity">
              {`Total for ${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`}
            </div>

            <div className="cart__line" />

            <button
              type="button"
              className="cart__checkout"
              onClick={() => setCheckout(true)}
            >
              Checkout
            </button>

            {checkout && (
              <div className="cart__message">
                <button
                  type="button"
                  className="cart__close cart__close--message"
                  onClick={() => setCheckout(false)}
                />

                <p className="cart__paragraph">
                  We are sorry, but this feature is not implemented yet
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};
