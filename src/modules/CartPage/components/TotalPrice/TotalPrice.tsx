import React, { useEffect, useRef } from 'react';
import './TotalPrice.scss';
import { Line } from '../../../shared/components/Line';
import { TextButton } from '../../../shared/components/Buttons/TextButton';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { Dialog } from '../Dialog';

type Props = {
  className: string;
};

export const TotalPrice: React.FC<Props> = ({ className }) => {
  const { cartItems, totalCartItem, setCartItems } = useGlobalContext();
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
        <h2 className="total-price__title-price">{`$${totalPrice}`}</h2>
        <p className="total-price__count-item">
          {`${texts.totalFor} ${totalCartItem} ${texts.items}`}
        </p>
      </div>
      <Line className="total-price__line" />
      {dialogRef && (
        <TextButton
          className="total-price__button"
          onClick={() => dialogRef.current?.showModal()}
          text={texts.checkout}
        />
      )}
      <Dialog dialogRef={dialogRef} clearCart={() => clearCart()} />
    </div>
  );
};
