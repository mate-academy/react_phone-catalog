import './CartPage.scss';
import { BackButton } from '../ProductDetailsPage/components/BackButton';
import { CartList } from './components/CartList';
import { CartCheckout } from './components/CartCheckout';
import { CartItem as CartItemType } from './../../types/CartItem';

type Props = {
  cart: CartItemType[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export const CartPage: React.FC<Props> = ({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="container">
      <BackButton />
      <div className="page-title">Cart</div>
      <section className="cart">
        {cart.length > 0 ? (
          <>
            <CartList
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <CartCheckout cart={cart} />
          </>
        ) : (
          <h2 className="cart__empty section-title">Your cart is empty</h2>
        )}
      </section>
    </div>
  );
};
