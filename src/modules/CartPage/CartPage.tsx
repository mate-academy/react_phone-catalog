import { GoBack } from '@/shared/components/GoBack';
import container from '@/shared/styles/Container.module.scss';
import { CartItems } from './components/CatrItems';
import styles from './CartPage.module.scss';
import { ProductActionButton } from '@/shared/components/ProductActionButton';
import { useCart } from '@/shared/context/CartContext/useCart';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const { cart, totalProductsPrice, totalItems, clearCart } = useCart();

  const itemOrItems = totalItems === 1 ? 'item' : 'items'; //change

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div className={container.container}>
        <GoBack />

        <h1 className={styles.title}>{t('cart.title')}</h1>

        <div className={styles.itemsToBy}>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            <CartItems products={cart} />
          )}

          {cart.length > 0 && (
            <div className={styles.proceedToCheckout}>
              <div className={styles.totalPriceBlock}>
                <p className={styles.totalPrice}>${totalProductsPrice}</p>
                <p className={styles.total}>
                  Total for {totalItems} {itemOrItems}
                </p>
              </div>
              <ProductActionButton
                text="Checkout"
                onClick={() => handleCheckout()}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
