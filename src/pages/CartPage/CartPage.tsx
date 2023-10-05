import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../providers/CartProvider/CartProvider';

import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { Popup } from '../../components/Popup/Popup';

import { useDisableScrollOnPopup }
  from '../../helpers/useDisableScrollOnPopup';

import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { productsInCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = productsInCart.reduce(
    (prevValue, currentValue) => prevValue
      + currentValue.price
      * currentValue.quantity, 0,
  );

  const totalQuantity = useMemo(() => {
    return productsInCart.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity;
    }, 0);
  }, [productsInCart]);

  const handleShowPopup = () => {
    setShowPopup((prev) => !prev);
  };

  useDisableScrollOnPopup(showPopup);

  return (
    <div className="CartPage">
      <div className="container">
        <div className="CartPage__content">
          <BackButton />

          {totalQuantity === 0 ? (
            <h1 className="CartPage__title CartPage__title--no-products">
              Your cart is empty. Maybe you want to choose something in
              {' '}
              <Link className="CartPage__link" to="/phones">
                Phones
              </Link>
              ,
              {' '}
              <Link className="CartPage__link" to="/tablets">
                Tablets
              </Link>
              {' '}
              or
              {' '}
              <Link className="CartPage__link" to="/accessories">
                Accessories
              </Link>
              {' '}
              ?
            </h1>
          ) : (
            <>
              <h1 className="CartPage__title">Cart</h1>

              <div className="CartPage__blocks">
                <div className="CartPage__list">
                  {productsInCart.map(product => {
                    if (product.quantity === 0) {
                      return false;
                    }

                    return <CartItem product={product} key={product.id} />;
                  })}
                </div>

                <div className="CartPage__checkout">
                  <div className="CartPage__checkout-content">
                    <div className="CartPage__checkout-title">{`$${totalPrice}`}</div>

                    <div
                      className="CartPage__checkout-subtitle"
                    >
                      {`Total for ${totalQuantity} items`}
                    </div>

                    <button
                      type="button"
                      className="CartPage__checkout-button"
                      onClick={handleShowPopup}
                      disabled={showPopup}
                    >
                      Checkout
                    </button>
                    {showPopup && <Popup onClose={handleShowPopup} />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
