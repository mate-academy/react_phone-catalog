import { TypeAnimation } from 'react-type-animation';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { CartList } from '../components/Cart/CartList';
import { selectCartPhones } from '../features/cartSlices/cartSlice';
import { ArrowRight } from '../icons/ArrowRight1';
import '../components/Cart/CartList.scss';

export const CartPage = () => {
  const phoneCart = useAppSelector(selectCartPhones);
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  console.log(navigationType);
  const goBack = () => {
    // if (navigationType === 'PUSH') {
    navigate(-1);
    // }
  };

  return (
    <>
      <button
        className="cart__btn-goBack"
        type="button"
        onClick={goBack}
      >
        <ArrowRight />
        <span>Back</span>
      </button>
      <h1 className="cart__title">Cart</h1>
      {!phoneCart.length ? (
        <TypeAnimation
          sequence={[
            'Your cart is empty, please add a product', 1000,
          ]}
        />
      ) : (
        <CartList phoneCart={phoneCart} />
      )}
    </>
  );
};
