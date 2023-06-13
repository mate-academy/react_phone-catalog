import './CartPage.scss';

import { useMemo } from 'react';
import { ButtonBack } from '../../components/ButtonBack';
import { CartList } from '../../components/CartList';
import { Product } from '../../types/Product';

type Props = {
  cartItems: Product[];
  removeProductFromCart: (id: string) => void;
};

export const CartPage: React.FC<Props> = ({
  cartItems,
  removeProductFromCart,
}) => {
  const cartTotalItems = useMemo(
    () => cartItems.length, [cartItems],
  );

  const cartTotalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0), [cartItems],
  );
  
  return (
    <section className="page__section cart-page">
      <div className="cart-page__container">
        <div className="cart-page__button-back">
          <ButtonBack />
        </div>

        <h1 className="cart-page__title">
          Cart
        </h1>

        <div className="cart-page__content">
          {!cartItems.length
            ? (<h2 className="cart-page__notification">Your cart is empty</h2>)
            : (
              <div className="cart-page__cart-list">
                <CartList
                  cartItems={cartItems}
                  removeProductFromCart={removeProductFromCart}
                />
              </div>
            )
          }

          <div className="cart-page__total-box">
            <h1 className="cart-page__total-price">
              {`$${cartTotalPrice}`}
            </h1>

            <div className="cart-page__items-count">
              {`Total for ${cartTotalItems} items`}
            </div>

            <button
              type="button"
              className="cart-page__action button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
