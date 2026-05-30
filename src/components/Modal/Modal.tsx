import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cartItems';

import './Modal.scss';

type Props = {
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleClearButtonClick = () => {
    dispatch(clearCart());
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Checkout is not implemented</h3>

        <p className="body-text">Do you want to clear the cart?</p>

        <div className="button-group">
          <button
            className="button clear-cart"
            onClick={handleClearButtonClick}
          >
            Clear the cart
          </button>

          <button className="button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
