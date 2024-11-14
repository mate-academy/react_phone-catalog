import styles from './Modal.module.scss';
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../../../../ContextProvider';

interface Props {
  handleModal: (open: boolean) => void;
}

export const Modal: React.FC<Props> = ({ handleModal }) => {
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
          Checkout is coming soon! <br />
          {/*eslint-disable-next-line max-len*/}
          For&nbsp;now,&nbsp;would&nbsp;you&nbsp;like&nbsp;to&nbsp;clear&nbsp;your&nbsp;cart?
        </p>
        <div className={styles.btnContainer}>
          <button
            className={classNames(styles.btnConfirm, 'btnCart')}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className={classNames(styles.btnCancel, 'btnCart')}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
