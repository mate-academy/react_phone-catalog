import React, { useEffect, useRef } from 'react';
import './TotalPrice.scss';
import { Line } from '../../../shared/components/Line';
import { TextButton } from '../../../shared/components/Buttons/TextButton';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { Button } from '../../../shared/components/Buttons/Button';
import { useLanguage } from '../../../../context/LanguageContext';

type Props = {
  className: string;
};

export const TotalPrice: React.FC<Props> = ({ className }) => {
  const { cartItems, setCartItems } = useGlobalContext();
  const { texts } = useLanguage();
  const totalPrice = cartItems.reduce(
    (previousValue, item) => previousValue + item.product.price * item.quantity,
    0,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.close();
  }, []);

  const clearCart = () => {
    setCartItems([]);
    dialogRef.current?.close();
  };

  return (
    <div className={`total-price ${className}`}>
      <div className="total-price__price">
        <h2 className="total-price__text-price">{`$${totalPrice}`}</h2>
        <p className="total-price__count-item">
          {`${texts.totalFor} ${cartItems.length} ${texts.items}`}
        </p>
      </div>
      <Line className="total-price__line" />
      {dialogRef && (
        <TextButton
          className="total-price__button"
          onClick={() => dialogRef.current?.showModal()}
          text="Checkout"
        />
      )}
      <dialog className="dialog" ref={dialogRef}>
        <div className="dialog__header">
          <h3 className="dialog__text">
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
          onClick={() => clearCart()}
          text="Clear cart"
        />
      </dialog>
    </div>
  );
};
