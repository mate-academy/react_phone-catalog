/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Icons, ModalButton, Title } from '@ui/index';

import { useAction } from '@hooks/index';

import styles from './CartModal.module.scss';

interface TProps {
  toggleModal: () => void;
}

const CartModal = forwardRef<HTMLDialogElement, TProps>(
  ({ toggleModal }, ref) => {
    const { t } = useTranslation();
    const { checkoutItems } = useAction();
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, [ref]);

    const handleOutsideClick = useCallback(
      (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.currentTarget === event.target) {
          toggleModal();
        }
      },
      [toggleModal],
    );

    return (
      <dialog
        className={styles.modal}
        ref={ref}
        onClick={handleOutsideClick}
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <Title level={3} id="modal-title">
            {t('cart.modal.confirmation')}
          </Title>
          <button
            type="button"
            onClick={toggleModal}
            aria-label={t('cart.modal.closeLabel')}
            ref={closeButtonRef}
          >
            <Icons.CloseIcon />
          </button>
        </div>

        <div className={styles.text}>
          <p>{t('cart.modal.text')}</p>
        </div>

        <div className={styles.buttons}>
          <ModalButton
            text={t('cart.modal.accept')}
            ariaLabel={t('cart.modal.clearLabel')}
            onClickAction={() => checkoutItems()}
          />
          <ModalButton
            text={t('cart.modal.cancel')}
            ariaLabel={t('cart.modal.cancelLabel')}
            onClickAction={toggleModal}
          />
        </div>
      </dialog>
    );
  },
);

CartModal.displayName = 'CartModal';

export default CartModal;
