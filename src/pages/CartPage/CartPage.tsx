import styles from './CartPage.module.scss';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { useProductStore } from '@/store/productStore';
import { CartItem } from '@/features/cart/components/CartItem';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { BackButton } from '@/components/ui/BackButton';

export const CartPage = () => {
  const { t } = useTranslation();
  const { cart } = useProductStore();

  return (
    <div className={styles.page}>
      <BackButton />
      <h1 className={styles.title}>{t('cart.title')}</h1>

      {cart.length === 0 ? (
        <>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.img
              src="/img/cart-is-empty.png"
              alt="404 cat"
              className={styles.image}
              animate={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </motion.div>
          <div className={styles.empty}>
            <p>{t('cart.empty')}</p>
          </div>
        </>
      ) : (
        <div className={styles.layout}>
          <AnimatePresence mode="popLayout">
            <div className={styles.items}>
              {cart.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </AnimatePresence>
          <CartSummary items={cart} />
        </div>
      )}
    </div>
  );
};
