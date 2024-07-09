import { useContext } from 'react';
import { IconClose } from '../Icons/IconClose';
import style from './ModalWindow.module.scss';
import { StateContext } from '../../store/StateProvider';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';

export const ModalWindow = () => {
  const { setModalWindow } = useContext(StateContext);
  const { clearAllFromCart } = useContext(ShoppingCartContext);
  return (
    <div className={style.modalWindow}>
      <div className={style.modalWindow__container}>
        <div className={style.modalWindow__closeContainer}>
          <button
            className={style.modalWindow__closeButton}
            onClick={() => setModalWindow(false)}
          >
            <IconClose />
          </button>
        </div>

        <div className={style.modalWindow__title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </div>
        <div className={style.modalWindow__actionButton}>
          <button
            className={style.modalWindow__clear}
            onClick={() => {
              clearAllFromCart();
              setModalWindow(false);
            }}
          >
            Clear
          </button>
          <button
            className={style.modalWindow__cancel}
            onClick={() => {
              setModalWindow(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
