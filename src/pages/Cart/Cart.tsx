import { useState } from 'react';
import { useCart } from 'context';
import { Button } from 'components/ui-kit';
import { BackButton, Wrapper } from 'components';
import { ButtonType } from 'types';
import { CartItem } from './components';
import './Cart.scss';

export const Cart = () => {
  const { cart, totalPrice, totalQuantity } = useCart();
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

                  <p className="cart__quantity">{`Total for ${totalQuantity} items`}</p>

                  <Button
                    buttonType={ButtonType.Checkout}
                    onClickHandler={() => setMessage(true)}
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
