import { AnimatePresence, motion } from 'motion/react';
import { Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './CheckoutPopup.module.scss';
import { GithubIcon } from '../../../../components/ui/GithubIcon';
import { useProductStore } from '@/store/productStore';

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutPopup = ({ isOpen, onClose }: CheckoutPopupProps) => {
  const { t } = useTranslation();
  const clearCart = useProductStore(state => state.clearCart);

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <h3 className={styles.title}>{t('checkoutPopup.title')}</h3>
            <p className={styles.message}>{t('checkoutPopup.message')}</p>
            <div className={styles.actions}>
              <a
                href="https://github.com/YuliiaKosenchuk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
              >
                <GithubIcon size={20} className={styles.githubIcon} />
                {t('checkoutPopup.githubBtn')}
              </a>

              <button className={styles.clearBtn} onClick={handleClearCart}>
                <Trash2 size={18} />
                {t('checkoutPopup.clearCartBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
