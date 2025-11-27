import { useState } from 'react';
import { Line } from '../../../shared/components/Line';
import { Modal } from '../../../shared/components/Modal';
import scss from './Total.module.scss';

interface Props {
  totalItems: number;
  totalPrice: number;
  onClearCart: () => void;
}

export const Total: React.FC<Props> = ({
  totalItems,
  totalPrice,
  onClearCart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    onClearCart();
    setIsModalOpen(false);
  };

  return (
    <section className={scss.total}>
      <h2 className={scss.total__price}>{`$${totalPrice.toFixed(2)}`}</h2>
      <p className={scss.total__amount}>{`Total for ${totalItems} items`}</p>
      <Line marginTop={1.6} marginBottom={1.6} />
      <button className={scss.total__checkout} onClick={handleCheckout}>
        Checkout
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className={scss.modalContent}>
          <h3 className={scss.modalContent__title}>
            Checkout is not implemented yet.
          </h3>
          <p className={scss.modalContent__text}>
            Do you want to clear the Cart?
          </p>

          <div className={scss.modalContent__actions}>
            <button className={scss.modalContent__button} onClick={handleClose}>
              Cancel
            </button>

            <button
              className={`${scss.modalContent__button} ${scss.modalContent__button_danger}`} // Opcjonalnie inna klasa
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
