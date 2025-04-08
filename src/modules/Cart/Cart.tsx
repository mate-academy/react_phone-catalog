import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';
import arrowLeft from '../../assets/Icons/Arrow-left.svg';
import { UseHooks } from '../../AppHooks';
import { CartItem } from '../../components/CartItem';
import classNames from 'classnames';
import { DeviceShort } from '../../types/DeviceShort';

export const Cart = () => {
  const { cartItems, hotProducts, setOpenModal } = UseHooks();

  const currentPrice = (item: DeviceShort) => {
    return hotProducts.some(prod => prod.name === item.name)
      ? item.price
      : item.fullPrice;
  };

  const devicesInCart = () => {
    return cartItems.reduce((quantity, [, count]) => count + quantity, 0);
  };

  const totalPrice = cartItems.reduce(
    (sum, [device, count]) => sum + currentPrice(device) * count,
    0,
  );

  const handleModal = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <>
      <div className="inlineContainer">
        <div className={styles.tree}>
          <Link className={styles.tree__link} to={'/home'}>
            <img src={arrowLeft} alt="back" />
            <p className={(styles.tree__text, 'small-text')}>Back</p>
          </Link>
        </div>
        <h1>Cart</h1>
        {cartItems.length > 0 ? (
          <div className={styles.block}>
            <div className={styles.list}>
              {cartItems.map(item => (
                <CartItem key={item[0].id} item={item[0]} quantity={item[1]} />
              ))}
            </div>
            <div className={styles.checkout}>
              <h2 className={styles.checkout__price}>${totalPrice}</h2>
              <p className={classNames(styles.checkout__items, 'body-text')}>
                {devicesInCart() > 1
                  ? `Total for ${devicesInCart()} items`
                  : 'Total for 1 item'}
              </p>
              <div className={styles.checkout__divider}></div>
              <button
                className={styles.checkout__button}
                onClick={() => handleModal()}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h3>Your cart is empty</h3>
        )}
      </div>
    </>
  );
};
