import './CheckoutNotification.scss';
import closeIcon from '../../img/Union.svg';
import { useAppDispatch } from '../../app/hooks';
import { closeCheckout } from '../../redux/reducers/checkoutReducer';

export const CheckoutNotification = () => {
  const dispatch = useAppDispatch();

  const handleCloseCheckoutNotification = () => {
    dispatch(closeCheckout());
  };

  return (
    <div className="checkout">
      <button
        type="button"
        className="checkout__button"
        onClick={handleCloseCheckoutNotification}
      >
        <img src={closeIcon} alt="close" />
      </button>
      <p className="checkout__text">
        We are sorry, but this feature is not implemented yet :(
      </p>
    </div>
  );
};
