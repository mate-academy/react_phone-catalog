import './CartWindow.scss';
import Cross from '../../images/cartImages/Cross.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/cartSlice';

type ClickedProps = {
  setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartWindow:React.FC<ClickedProps> = ({setButtonClicked}) => {
  const dispatch = useAppDispatch();
  const cartProducts  = useAppSelector(state => state.cartItems);
  
  const handleConfirm = () => {
    dispatch(actions.removeAll());
    setButtonClicked(false)
  }

  console.log(cartProducts)

  return (
    <div className='cart__window'>
      <div className='cartWindow__container'>
      <button
        type="button"
        onClick={() => {
          setButtonClicked(false)
        }}>
        <img
          src={Cross}
          alt="Cross"
          className="cartProduct__cross"
        />
      </button>
      <div>Checkout is not implemented yet. Do you want to clear the Cart?</div>
      <button
        type="button"
        onClick={handleConfirm}>
          Confirm
      </button>
      </div>
    </div>
  )
}