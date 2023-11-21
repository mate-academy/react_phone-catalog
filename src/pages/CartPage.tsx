import React from 'react';
import ReactTyped from 'react-typed';
import { Loader } from '../components/Loader/Loader';
import { CartItem } from '../components/CartItem/CartItem';
import { BackButton } from '../components/BackButton/BackButton';
import { useAppSelector } from '../app/hooks';

type Props = {
  isLoading: boolean;
};

export const CartPage: React.FC<Props> = ({ isLoading }) => {
  const cartStore = useAppSelector(store => store.cart);

  const totalPrice = cartStore.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      if (currentProduct.fullPrice < 1200) {
        return accumulator + (currentProduct.amount * currentProduct.price);
      }

      return accumulator + (currentProduct.amount * currentProduct.fullPrice);
    }

    return 0;
  }, 0);

  const totalItems = cartStore.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + currentProduct.amount;
    }

    return 0;
  }, 0);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <main className="cart">
      <div className="container">
        <div className="cart__wrapper">
          <BackButton />
          <h2 className="title cart__title">Cart</h2>

          {cartStore.length
            ? (
              <div className="cart__content">
                <div className="cart__list">
                  {cartStore.map(item => (
                    <CartItem phone={item} key={item.id} />
                  ))}
                </div>

                <div className="cart__total">
                  <div className="cart__info">
                    <span className="cart__amount" data-cy="productQauntity">{`$${totalPrice}`}</span>

                    <span className="cart__itemsAmount">{`Total for ${totalItems} items`}</span>
                  </div>

                  <button
                    type="button"
                    className="cart__button"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )
            : (
              <div className="pageEmpty">
                <ReactTyped
                  strings={['Your cart is empty']}
                  typeSpeed={75}
                  className="title"
                  showCursor={false}
                />
              </div>
            )}
        </div>
      </div>
    </main>
  );
};
