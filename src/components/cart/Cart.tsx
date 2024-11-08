import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, BackArrow, Title } from '@ui/index';

import { useCart } from '@hooks/index';

import { SeverityType, WARNING_ALERT } from '@utils/constants/Alerts';

import styles from './Cart.module.scss';
import { CartEmpty, CartItem, CartModal, CartSummary } from './index';

export const Cart: FC = () => {
  const { t } = useTranslation();
  const { cartItems } = useCart();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasItemsInCart = cartItems.length > 0;
  const severity = t(
    `alert.${WARNING_ALERT.severity}.severity`,
  ) as SeverityType;
  const message = t(`alert.${WARNING_ALERT.severity}.message`);

  const closeAlert = () => {
    setShowAlert(false);
    setHideAlert(false);
  };
  const toggleModal = () => {
    if (!modalRef.current) return;

    if (isOpen) {
      modalRef.current.close();
      setIsOpen(false);
    } else {
      modalRef.current.showModal();
      setIsOpen(true);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('hiddenScroll', isOpen);
    return () => {
      document.body.classList.remove('hiddenScroll');
    };
  }, [isOpen]);

  return (
    <>
      {hasItemsInCart ? (
        <section className={styles.page}>
          <BackArrow />
          <Title level={2}>{t('cart.title')}</Title>
          {showAlert && (
            <Alert
              severity={severity}
              message={message}
              name={WARNING_ALERT.name}
              hideAlert={hideAlert}
              closeAlert={closeAlert}
            />
          )}
          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.product.id}
                  item={item.product}
                  quantity={item.quantity}
                  showAlert={showAlert}
                  setHideAlert={setHideAlert}
                  setShowAlert={setShowAlert}
                />
              ))}
            </div>

            <CartSummary toggleModal={toggleModal} />

            <CartModal ref={modalRef} toggleModal={toggleModal} />
          </div>
        </section>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};
