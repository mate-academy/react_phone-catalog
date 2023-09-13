import { useState } from 'react';
import { Button } from '../../bits';
import { BackButton, Wrapper } from '../../components';
import { useProducts } from '../../context';
import { ButtonType } from '../../types';
import './Cart.scss';
import { CartItem } from './components';

export const Cart = () => {
  const { cart } = useProducts();
  const initialTotalPrice = cart.reduce((prev, next) => prev + next.price, 0);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [message, setMessage] = useState(false);

  return (
    <div className="cart">
      <Wrapper>
        <div className="cart__back-container">
          <BackButton />
        </div>

        <h1 className="cart__title">Cart</h1>

        {!cart.length && <p className="cart__message">Your cart is empty</p>}

        {!message
          ? (
            <div className="cart__content">
              <>
                {cart && cart.length > 0 && (
                  <div className="cart__list">
                    {cart.map(item => (
                      <CartItem
                        key={item.id}
                        product={item}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                      />
                    ))}
                  </div>
                )}
              </>

              {cart && cart.length > 0 && (
                <div className="cart__total-price-block">
                  <p
                    className="cart__price"
                    data-cy="productQauntity"
                  >
                    {`$${totalPrice}`}
                  </p>

                  <p className="cart__quantity">{`Total for ${cart.length} items`}</p>

                  <Button
                    size={ButtonType.checkout}
                    handler={() => setMessage(true)}
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="cart__message">
              We are sorry, but this feature
              is not implemented yet.
            </p>
          )}
      </Wrapper>
    </div>
  );
};
