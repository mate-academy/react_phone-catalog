import { useContext } from 'react';
import { IconClose } from '../Icons/IconClose';
import style from './ModalWindow.module.scss';
import { StateContext } from '../../store/StateProvider';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';
import { LanguageContext } from '../../store/LanguageProvider';

export const ModalWindow = () => {
  const { setModalWindow } = useContext(StateContext);
  const { clearAllFromCart } = useContext(ShoppingCartContext);
  const { t } = useContext(LanguageContext);

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
          {t('checkoutIsntImplemented')}
        </div>
        <div className={style.modalWindow__actionButton}>
          <button
            className={style.modalWindow__clear}
            onClick={() => {
              clearAllFromCart();
              setModalWindow(false);
            }}
          >
            {t('clear')}
          </button>
          <button
            className={style.modalWindow__cancel}
            onClick={() => {
              setModalWindow(false);
            }}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
