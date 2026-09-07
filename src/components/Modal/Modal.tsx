import { useTranslation } from 'react-i18next';
import { clearCart } from '../../features/cart';
import { useAppDispath } from '../../hooks/hooks';
import './Modal.scss';
import React from 'react';

type Props = {
  setIsOpen: (value: boolean) => void;
};

export const Modal: React.FC<Props> = React.memo(({ setIsOpen }) => {
  const dispatch = useAppDispath();

  const { t } = useTranslation();

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal__box">
        <h3 className="modal__title">{t('modal.title')}</h3>
        <p className="modal__question">{t('modal.question')}</p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__buttons--clear"
            onClick={handleClearCart}
          >
            {t('modal.button.clear')}
          </button>
          <button
            className="modal__button modal__buttons--cancel"
            onClick={() => setIsOpen(false)}
          >
            {t('modal.button.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
