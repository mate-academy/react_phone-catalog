import './styles/Page.scss';
import { useAppSelector } from '../helpers/app/hooks';
import { BackButton } from '../components/BackButton';
import { CartItemList } from '../components/CartItemsList';

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className="Page Page--gap--narrower Page--padding--top--wider">
      <div className="Page__top Page__top--gap--wider">
        <BackButton />

        <h1 className="Page__title">Cart</h1>
      </div>

      {!cart.length ? (
        <p className="Page__amount">Your cart is empty</p>
      ) : (
        <CartItemList cart={cart} />
      )}
    </div>
  );
};
