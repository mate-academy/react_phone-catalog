import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton/BackButton';
import { ModalDialog } from '../../components/ModalDialog';
import { NotFound } from '../../components/NotFound';
import styles from './CartPage.module.scss';
import { CartItem } from './components';

export const CartPage = () => {
  const { items, totalPrice } = useAppSelector(state => state.cartProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalNumberOfItems = useMemo(() => {
    return items.reduce((sum: number, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <div className={styles.cart_page}>
      <BackButton mode="Back" />

      <h1 className={styles.title}>Cart</h1>

      {items.length > 0 ? (
        <>
          <div className={styles.cart_items}>
            <div className={styles.items}>
              {items.map(item => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
            <div className={styles.total_price_box}>
              <p className={styles.total_price}>${totalPrice}</p>
              <p className={styles.total_price_info}>
                Total for {totalNumberOfItems}{' '}
                {totalNumberOfItems > 1 ? 'items' : 'item'}
              </p>
              <div className={styles.divider} />
              <button
                className={styles.button_checkout}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
          {isModalOpen && (
            <ModalDialog closeModal={() => setIsModalOpen(false)} />
          )}
        </>
      ) : (
        <NotFound title={`Your cart is empty...`} mode="cart" />
      )}
    </div>
  );
};
