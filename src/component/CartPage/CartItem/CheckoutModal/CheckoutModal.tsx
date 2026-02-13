import { useContext } from 'react';
import style from './CheckoutModal.module.scss';
import { DispatchContext } from './../../../../hooks/SelectionState';
import Close from './../../../../../public/icon/Union.png';

interface Props {
  close: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ close }) => {
  const dispatch = useContext(DispatchContext);
  const confirm = () => {
    dispatch({ type: 'clearCart' });
    close();
  };

  return (
    <div className={style.modal}>
      <div className={style.modal__content}>
        <button className={style.modal__close} onClick={close}>
          <img src={Close} className={style.modal__icon} />
        </button>
        <p className={style.modal__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <button className={style.modal__confirm} onClick={confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};
