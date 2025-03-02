import React from 'react';
import style from './Modal.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { cartSlice } from '../../features/cartSlice';

type ModalProps = {
  setCheckout: (value: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({ setCheckout }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.modal}>
      <div className={style.modal__container}>
        <div
          className={style.modal__button__close}
          onClick={() => setCheckout(false)}
        ></div>
        <h4 className={style.modal__title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h4>
        <button
          className="card__button--add"
          onClick={() => {
            setCheckout(false);
            dispatch(cartSlice.actions.clearGoods());
          }}
        >
          Clear the Cart
        </button>
      </div>
    </div>
  );
};
