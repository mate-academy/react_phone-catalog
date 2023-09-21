import './CartModal.scss';
import { useAppDispatch } from '../../app/hooks';
import { clearItems } from '../../redux/reducers/cartReducer';
import { closeModal } from '../../redux/reducers/modalWindowReducer';

export const CartModal = () => {
  const dispatch = useAppDispatch();
  const handleConfirmClearCart = () => {
    dispatch(clearItems());
    dispatch(closeModal());
  };

  const handleCancelClearCart = () => {
    dispatch(closeModal());
  };

  return (
    <div className="cart-modal">
      <h2 className="cart-modal__title">
        Would you like to remove all products from the cart?
      </h2>
      <div className="cart-modal__buttons-container">
        <button
          onClick={handleConfirmClearCart}
          type="button"
          className="cart-modal__button"
        >
          Yes, clear the cart
        </button>
        <button
          type="button"
          onClick={handleCancelClearCart}
          className="cart-modal__button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
