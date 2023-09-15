import { useContext, useMemo } from 'react';
import { GoBackLink } from '../../components/GoBackLink';
import './cart-page.scss';
import { StoreContext } from '../../contexts/StoreContext';
import { CartItem } from '../../types/CartItem';
import { CartItemCard } from '../../components/CartItemCard';
import { NoResults } from '../../components/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';

export const CartPage = () => {
  const { cart, cartItemsNumber: totalItems } = useContext(StoreContext);
  const cartItems: CartItem[] = useMemo(() => Object.values(cart), [cart]);
  const totalPrice: number = useMemo(() => {
    return cartItems.reduce((acc, { good, quantity }) => {
      return acc + good.price * quantity;
    }, 0);
  }, [cart]);

  return (
    <div className="cart-page">
      <div className="cart-page__go-back">
        <GoBackLink />
      </div>

      <h1 className="cart-page__title">cart</h1>

      {cartItems.length ? (
        <section className="cart-page__main">
          <div className="cart-page__items">
            {cartItems.map(cartItem => {
              return (
                <CartItemCard
                  key={cartItem.good.id}
                  cartItem={cartItem}
                />
              );
            })}
          </div>

          <div className="cart-page__summary">
            <h1 className="cart-page__total-price">
              {`$${totalPrice}`}
            </h1>

            <p className="cart-page__total-items">
              {`Total for ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            </p>

            <button
              type="button"
              className="cart-page__checkout-button"
            >
              Checkout
            </button>
          </div>
        </section>
      ) : (
        <NoResults
          caseName={NoResultsCaseName.EmptyCart}
        />
      )}
    </div>
  );
};
