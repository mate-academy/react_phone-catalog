import { Cart } from '../components/Cart';
import { Back } from '../components/Back';

export const CartPage = () => {
  return (
    <>
      <div className="cart__btn-back">
        <Back />
      </div>

      <Cart />
    </>
  );
};
