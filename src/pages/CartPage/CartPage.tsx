/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../../context';
import { BackButton } from '../../components/BackButton';
import './cart-page.scss';
import { scrollToTop } from '../../helpers/scrollToTop';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { CartList } from '../../components/CartList';
import { CartInfo } from '../../components/CartInfo/CartInfo';

export const Cart = () => {
  const {
    setCurrentPage,
    cartItems,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Cart');
    scrollToTop();
  }, []);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((
      sum, item,
    ) => sum + item.qnty * item.product.price, 0);
  }, [cartItems]);

  const totalQnty = useMemo(() => {
    return cartItems.reduce((sum: number, item) => sum + item.qnty, 0);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <div className="back-button__wrapper">
        <BackButton />
      </div>
      <h1 className="cart-page__title">Cart</h1>
      {cartItems.length === 0
        ? <NotFoundProducts />
        : (
          <div className="cart-information__wrapper">
            <CartList cartItems={cartItems} />
            <CartInfo
              totalAmount={totalAmount}
              totalQnty={totalQnty}
            />
          </div>
        )}

    </div>
  );
};
