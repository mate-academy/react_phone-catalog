import React, { useContext } from 'react';
import './CartModal.scss';
import { DispatchCartContext } from '../../shared/reduce/CartReducer';
import { TranslationContext } from '../../../i18next/shared';

type CartModalProps = {
  handleModal: (arg: boolean) => void;
};

export const CartModal: React.FC<CartModalProps> = React.memo(
  ({ handleModal }) => {
    const btnsTitle = useContext(TranslationContext).btnsTitle;
    const notifTextList = useContext(TranslationContext).notifMessage;
    const cartDispatch = useContext(DispatchCartContext);

    const handleConfirm = () => {
      cartDispatch({ type: 'clearCart' });

      handleModal(false);
    };

    return (
      <div className="cart-modal">
        <div className="cart-modal__overlay">
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">{notifTextList.notif}</span>
            </div>
            <div className="modal__body">{notifTextList.cartModalMessage}</div>
            <div className="modal__footer">
              <button className="modal__btn" onClick={handleConfirm}>
                {btnsTitle.confirm}
              </button>
              <button className="modal__btn" onClick={() => handleModal(false)}>
                {btnsTitle.deny}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CartModal.displayName = 'CartModal';
