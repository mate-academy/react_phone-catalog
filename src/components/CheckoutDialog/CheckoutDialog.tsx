import { useEffect, useRef } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import './CheckoutDialog.scss';

interface Props {
  totalCount: number;
  totalPrice: number;
  onClose: () => void;
}

export const CheckoutDialog: React.FC<Props> = ({
  totalCount,
  totalPrice,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useScrollLock(true);

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog?.showModal();

    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="CheckoutDialog"
      aria-labelledby="checkout-title"
      aria-describedby="checkout-description"
      onClose={onClose}
    >
      <h2 id="checkout-title" className="CheckoutDialog-title">
        Checkout is not available yet
      </h2>
      <p className="CheckoutDialog-summary">
        {totalCount} {totalCount === 1 ? 'item' : 'items'} · ${totalPrice}
      </p>
      <p id="checkout-description">
        This is a demo store. No payment will be taken, and your items will stay
        in your cart.
      </p>
      <form method="dialog">
        <button className="CheckoutDialog-button" type="submit">
          Continue shopping
        </button>
      </form>
    </dialog>
  );
};
