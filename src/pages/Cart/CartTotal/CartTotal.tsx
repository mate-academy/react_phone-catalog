import { useState, useEffect } from 'react';
import './CartTotal.scss';
import Modal from '../../../components/Modal/Modal';

type Props = {
  totalPrice: number;
  visibleCartLength: number;
};

const CartTotal: React.FC<Props> = ({
  totalPrice,
  visibleCartLength,
}) => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  useEffect(() => {
    if (isActiveModal) {
      setTimeout(() => {
        setIsActiveModal(false);
      }, 3000);
    }
  }, [isActiveModal]);

  const onClickHandle = () => {
    setIsActiveModal(true);
  };

  return (
    <>
      {isActiveModal && (
        <Modal />
      )}

      <div className="cart-total">
        <span className="cart-total__price">
          {`$${totalPrice}`}
        </span>
        <span className="cart-total__for">
          {`Total for ${visibleCartLength} items`}
        </span>
        <div className="line cart-total__line" />
        <button
          className="cart-total__checkout"
          type="button"
          onClick={onClickHandle}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartTotal;
