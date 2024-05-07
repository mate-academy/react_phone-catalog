import './cartProductList.scss';
import { CartCard } from '../CartCard';
import { useAppSelector } from '../../app/hooks';

export const CartProductList: React.FC = () => {
  const cart = useAppSelector(state => state.cart);

  return (
    <>
      <div className="cartProductList">
        {cart.cartItems.map(product => (
          <CartCard
            key={product.itemInCart.itemId}
            cartCardData={product.itemInCart}
          />
        ))}
      </div>
    </>
  );
};
