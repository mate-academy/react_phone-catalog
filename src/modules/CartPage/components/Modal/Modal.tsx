import styles from './Modal.module.scss';
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../../../../ContextProvider';
import { useTranslation, Trans } from 'react-i18next';

interface Props {
  handleModal: (open: boolean) => void;
}

export const Modal: React.FC<Props> = ({ handleModal }) => {
  const { t } = useTranslation('common');
  const { setCartProducts } = useContext(CartContext);
  const [isClosed, setIsClosed] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal.current) {
      modal.current.focus();
    }
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    setTimeout(() => handleModal(false), 250);
  };

  const closeModal: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void = e => {
    e.stopPropagation();

    if (
      (e.type === 'click' && e.currentTarget === e.target) ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Escape')
    ) {
      handleClose();
    }
  };

  const handleConfirm = () => {
    setCartProducts([]);
    handleClose();
  };

  return (
    <div
      ref={modal}
      className={classNames(styles.modalWrapper, {
        [styles.modalWrapperClosed]: isClosed,
      })}
      onClick={closeModal}
      onKeyDown={closeModal}
      tabIndex={-1}
    >
      <div
        className={classNames(styles.modalContainer, {
          [styles.modalContainerClosed]: isClosed,
        })}
      >
        <p className={styles.modalText}>
          <Trans i18nKey={'common:checkoutIsComing'}>
            Checkout is coming soon!
            <br /> For now, would you like to clear your cart?
          </Trans>
        </p>
        <div className={styles.btnContainer}>
          <button
            className={classNames(styles.btnConfirm, 'btnCart')}
            onClick={handleConfirm}
            aria-label={t('accessibility.confirmOrder')}
          >
            {t('buttons.confirm')}
          </button>
          <button
            className={classNames(styles.btnCancel, 'btnCart')}
            onClick={handleClose}
            aria-label={t('accessibility.cancelOrder')}
          >
            {t('buttons.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
