import React, { useEffect, useRef } from 'react';
import style from './Checkout.module.scss';

type Props = {
  onCheckout: (value: boolean) => void;
  onClearCart: () => void;
};

export const Checkout: React.FC<Props> = ({ onCheckout, onClearCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCheckout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCheckout]);

  return (
    <div className={style.checkout}>
      <div className={style.checkout__modal} ref={modalRef}>
        <h2 className={style.checkout__clear}>
          Do you want to clear the Cart?
        </h2>
        <span className={style.checkout__info}>
          Checkout is not implemented yet
        </span>
        <div className={style.checkout__buttons}>
          <button
            className={style.checkout__buttonNo}
            onClick={() => onCheckout(false)}
          >
            No
          </button>
          <button className={style.checkout__buttonYes} onClick={onClearCart}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
