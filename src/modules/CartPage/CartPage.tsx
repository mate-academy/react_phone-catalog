import { useContext, useMemo, useState } from 'react';
import styles from './CartPage.module.scss';
import { CartItem } from './components/CartItem';
import { CheckoutModal } from './components/CheckoutModal';
import { CartContext } from '../../context/CartContext';
import { BackButton } from '../shared/components/BackButton';
import classNames from 'classnames';
import { NoItemsMessage } from '../shared/components/NoItemsMessage';
import { Button } from '../shared/components/Button';

export const CartPage = () => {
  const { cartItems, cartTotalItemsCount } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const totalSum = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.amount * (item.product?.price || 0), 0),
    [cartItems],
  );

  return (
    <div className={styles.page}>
      <div className={styles.backButtonContainer}>
        <BackButton />
      </div>

      <h1
        className={classNames(styles.title, {
          [styles['title--noItems']]: !cartItems?.length,
        })}
      >
        Cart
      </h1>

      {!cartItems?.length ? (
        <NoItemsMessage message={'Your cart is empty'} />
      ) : (
        <div className={styles.container}>
          <div className={styles.cartItemsContainer}>
            {cartItems.map(item => (
              <div key={item.product?.id} className={styles.cartItem}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <div className={styles.totalContainer}>
            <div className={styles.top}>
              <p className={styles.totalSum}>${totalSum}</p>
              <p className={styles.totalItems}>
                Total for {cartTotalItemsCount} {cartTotalItemsCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            <span></span>

            <Button
              option={'primary'}
              onClick={() => setIsModalOpen(true)}
              className={styles.button}
            >
              Checkout
            </Button>
            <CheckoutModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
