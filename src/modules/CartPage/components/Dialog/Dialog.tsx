import React from 'react';
import './Dialog.scss';
import { useLanguage } from '../../../../context/LanguageContext';
import { Button } from '../../../shared/components/Buttons/Button';
import { TextButton } from '../../../shared/components/Buttons/TextButton';

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  clearCart: () => void;
};

export const Dialog: React.FC<Props> = ({ clearCart, dialogRef }) => {
  const { texts } = useLanguage();

  return (
    <dialog className="dialog" ref={dialogRef}>
      <div className="dialog__header">
        <h3 className="dialog__title">
          {texts.checkoutIsNotImplementedYetDoYouWantToClearTheCart}
        </h3>
        <Button
          className="cart-items__button-close"
          name="close"
          onClick={() => dialogRef.current?.close()}
        />
      </div>
      <TextButton
        className="dialog__button-clear"
        onClick={clearCart}
        text={texts.clearCart}
      />
    </dialog>
  );
};
