import React, { useContext } from 'react';
import './Modal.scss';
import { DispatchCartContext } from '../../../reducer/CartReducer';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type ModalProps = {
  handleModal?: (arg: boolean) => void;
  message: string;
  type: 'cartModal' | 'productsModal';
};

export const Modal: React.FC<ModalProps> = React.memo(
  ({ message, type, handleModal }) => {
    const { notifMessage, btnsTitle } = useContext(TranslationContext);
    const cartDispatch = useContext(DispatchCartContext);

    const handleConfirm = () => {
      if (!handleModal) {
        return;
      }

      cartDispatch({ type: 'clearCart' });

      handleModal(false);
    };

    const reload = () => {
      window.location.reload();
    };

    return (
      <div className="cart-modal">
        <div className="cart-modal__overlay">
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">{notifMessage.notif}</span>
            </div>
            <div className="modal__body" style={{ whiteSpace: 'pre-line' }}>
              {message}
            </div>
            <div className="modal__footer">
              {type === 'cartModal' && handleModal ? (
                <>
                  <button className="modal__btn" onClick={handleConfirm}>
                    {btnsTitle.confirm}
                  </button>
                  <button
                    className="modal__btn"
                    onClick={() => handleModal(false)}
                  >
                    {btnsTitle.deny}
                  </button>
                </>
              ) : (
                <button
                  className="modal__btn modal__btn--reload"
                  onClick={reload}
                >
                  {btnsTitle.reload}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
