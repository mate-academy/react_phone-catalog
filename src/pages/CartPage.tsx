import './styles/Page.scss';
import { BackLink } from '../components/BackLink';
import { useAppSelector } from '../helpers/app/hooks';
import { CartItemList } from '../components/CartItemsList';

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className="Page Page--gap--narrower">
      <div className="Page__top Page__top--gap--wider">
        <BackLink />
        <h1 className="Page__title">Cart</h1>
      </div>

      {!cart.length ? (
        <p>Your cart is empty</p>
      ) : (
        <CartItemList cart={cart} />
      )}
    </div>
  );
};
