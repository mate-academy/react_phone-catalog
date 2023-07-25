import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AppContext } from '../../context/AppContextProvider';
import { ProductInCart } from '../../types/Product';
import { SecondNavBar } from '../../components/SecondNavBar/SecondNavBar';
import { ModelsCounter } from '../../components/ModelsCounter/ModelsCounter';
import { NotFound } from '../../components/NotFound/NotFound';
import { CheckoutCard } from '../../components/CheckoutCard/CheckoutCard';
import './cartPage.scss';

export const CartPage:React.FC = () => {
  const { cart } = useContext(AppContext);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const totalCost = cart.reduce((
        accumulator,
        item: ProductInCart,
      ) => accumulator + item.price * item.count, 0);

      setTotalSum(totalCost);
    }
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupShown(false);
    }, 3000);
  }, [isPopupShown]);

  return (
    <div className="page__cart">
      <SecondNavBar />
      <h1 className="main-title">Cart</h1>
      <ModelsCounter number={cart.length} />

      {!cart.length ? (
        <NotFound
          title="Your cart is empty"
        />
      ) : (
        <div className="cart">
          <div className="cart__products">
            {cart.map(item => (
              <CheckoutCard key={item.id} item={item} />
            ))}
          </div>
          <div className="cart__container">
            <h1 data-cy="productQauntity" className="cart__budget">
              {`$${totalSum}`}
            </h1>
            <p className="cart__text">
              {`Total for ${cart.length} items`}
            </p>
            <button
              type="button"
              className="cart__checkout"
              onClick={() => setIsPopupShown(true)}
            >
              Checkout
            </button>
          </div>
          <div className={classNames(
            'cart__popup',
            { cart__popup_shown: isPopupShown },
          )}
          >
            Sorry, this funtion is not implemented yet.
          </div>
        </div>
      )}
    </div>
  );
};
