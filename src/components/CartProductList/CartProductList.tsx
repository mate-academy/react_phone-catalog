import './cartProductList.scss';
import { CartCard } from '../CartCard';
import { useAppSelector } from '../../app/hooks';

// type CartProductsProps = {
//   dataProducts: Phones[],
// };

export const CartProductList: React.FC = () => {
  const cart = useAppSelector(state => state.cart);

  // useEffect(() => {
  //   const json = JSON.stringify(cart);

  //   localStorage.setItem('cart', json);
  // }, [cart]);

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
