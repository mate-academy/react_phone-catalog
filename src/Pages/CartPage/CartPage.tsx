import styles from './CartPage.module.scss';
import arrowLeft from '../../shared/images/slider/arrow-left.png';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartPageItem } from './components/CartPageItem/CartPageItem';
import { CartPageTotal } from './components/CartPageTotal';
import cartEmpty from '../../../public/img/cart-is-empty.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkout } from './components/Checkout';

export const CartPage = () => {
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles.cartempty__container}>
          <img className={styles.cartempty} src={cartEmpty} />
        </div>
      ) : (
        <section className={styles.cartpage}>
          <div
            className={styles.cartpage__breadcrumbs}
            onClick={() => navigate(state.prev)}
          >
            <img
              src={arrowLeft}
              alt="arrowLeft"
              className={styles.cartpage__image}
            />
            <span style={{ color: '#89939A' }} className="small-text">
              Back
            </span>
          </div>
          <div className={styles.cartpage__container}>
            <h1 className={styles.cartpage__title}>Cart</h1>
            <div className={styles.cartpage__items}>
              {items.map(item => (
                <CartPageItem
                  key={item.product.id}
                  productItem={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <CartPageTotal onShowCheckout={value => setShowCheckout(value)} />
          </div>
          {showCheckout && (
            <Checkout onShowCheckout={value => setShowCheckout(value)} />
          )}
        </section>
      )}
    </>
  );
};
