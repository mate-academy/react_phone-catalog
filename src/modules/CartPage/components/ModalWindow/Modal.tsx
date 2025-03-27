import React, { useEffect, useRef } from 'react';
import style from './Modals.module.scss';

type Props = {
  isActive: boolean;
  setModalWindow: (value: boolean) => void;
  clearCart: () => void;
};

export const Modal: React.FC<Props> = ({ isActive, setModalWindow, clearCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalWindow(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive]);

  const handleClearCart = () => {
    clearCart();
    setModalWindow(false);
  }

  return (
    <div
      className={isActive ? `${style.modal}` : `${style.hidden}`}

    >
      <div className={style.modalWindow} ref={modalRef}>
        <h1 className={style.title}>
          Checkout is not implement yet. Do you want to clear the Cart?
        </h1>

        <div className={style.btnOptions}>
          <button className={`${style.btn} ${style.confirm}`} onClick={handleClearCart}>Confirm</button>
          <button className={`${style.btn} ${style.cancel}`} onClick={() => setModalWindow(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
