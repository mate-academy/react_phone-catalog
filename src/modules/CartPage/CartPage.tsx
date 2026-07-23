// #regionImport
import React from 'react';
import styles from './CartPage.module.scss';
import { Container } from '@shared/components/Container';
import { useCart } from '@shared/context/CartContext';
import { PageHeader } from '@shared/ui/PageHeader';
import { CartItem } from './CartItem';
import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { Divider } from '@shared/ui/Divider';
import { FadeIn } from '@shared/ui/FadeIn';
import { useTranslation } from 'react-i18next';
// #endregion

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const { t } = useTranslation();

  const totalSum = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = confirm(t('cart.checkoutConfirm'));

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <Container>
      <FadeIn>
        <PageHeader title={t('cart.title')} showBack />

        <div className={styles.cart}>
          {items.length === 0 ? (
            <>
              <Typography variant="h3" className={styles.cartMessage}>
                {t('cart.message')}
              </Typography>
            </>
          ) : (
            <div className={styles.cartList}>
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}

          <div className={styles.cartTotal}>
            <div className={styles.cartSum}>
              <div className={styles.cartSumTitle}>{`$${totalSum}`}</div>

              <p className={styles.cartItemsTotal}>
                {`
                  ${t('cart.total')} ${items.length}
                  ${t('items.item', { count: items.length })}
                `}
              </p>
            </div>

            <Divider />

            <Button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={styles.cartBtnCheckout}
            >
              {t('buttons.checkout')}
            </Button>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};
