import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { CartList } from '../components/Cart';
import { selectCartProducts } from '../features/cartSlices';
import { ArrowLeft } from '../icons';

import '../components/Cart/CartList.scss';

export const CartPage = () => {
  const productCart = useAppSelector(selectCartProducts);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        className="cart__btn-goBack"
        type="button"
        onClick={goBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </button>
      <h1 className="cart__title">Cart</h1>
      {!productCart.length ? (
        <TypeAnimation
          sequence={[
            'Your cart is empty, please add a product', 1000,
          ]}
        />
      ) : (
        <CartList productCart={productCart} />
      )}
    </>
  );
};
