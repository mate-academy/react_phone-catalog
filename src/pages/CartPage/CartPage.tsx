import { FC, useState, useEffect, useContext } from 'react';
import './CartPage.scss';
import { CartItem } from '../../components/CartItem';
import { CartProduct } from '../../types/CartProduct';
import { Product } from '../../types/Product';
import { LSCart } from '../../helpers/LSCart';
import { CartContext } from '../../store/CartContext';
import { BackBtn } from '../../components/BackBtn';

export const CartPage: FC = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartSum, setCartSum] = useState(0);

  const [checkoutMode, setCheckoutMode] = useState(false);

  const { cartQuantity, setCartQuantity } = useContext(CartContext);

  useEffect(() => {
    const stringLS = localStorage.getItem('cart');

    if (stringLS !== null) {
      setCart(JSON.parse(stringLS));
    }
  }, []);

  const incrementCartProductQuantity = (product: Product) => {
    LSCart.incrementProductCountInLSCart(product);
    setCartQuantity(prev => prev + 1);
    setCart(
      cart.map(cartEl => {
        if (cartEl.id === product.id) {
          return { ...cartEl, quantity: cartEl.quantity + 1 };
        }

        return cartEl;
      }),
    );
  };

  const decrementCartProductQuantity = (product: Product) => {
    LSCart.decrementProductCountInLSCart(product);
    setCartQuantity(prev => prev - 1);

    setCart(
      cart.map(cartEl => {
        if (cartEl.id === product.id) {
          return { ...cartEl, quantity: cartEl.quantity - 1 };
        }

        return cartEl;
      }),
    );
  };

  const removeCartItemFromLSCart = (cartItem: CartProduct) => {
    LSCart.removeProductFromLSCart(cartItem.product);
    setCartQuantity(prev => prev - cartItem.quantity);

    setCart(cart.filter(el => el.id !== cartItem.product.id));
  };

  useEffect(() => {
    let sum = 0;

    cart.forEach(el => {
      sum += el.product.price * el.quantity;
    });
    setCartSum(sum);
  }, [cart]);

  return (
    <main className="page">
      <BackBtn />
      {checkoutMode && (
        <h1 className="cart__title">
          We are sorry, but this feature is not implemented yet
        </h1>
      )}
      {cart.length > 0 && !checkoutMode ? (
        <>
          <h1 className="page__title cart__title">Cart</h1>
          <div className="cart__content">
            <ul className="cart__items">
              {cart.map(product => {
                return (
                  <CartItem
                    item={product}
                    key={product.id}
                    incrementCartProductQuantity={incrementCartProductQuantity}
                    decrementCartProductQuantity={decrementCartProductQuantity}
                    removeCartItemFromLSCart={removeCartItemFromLSCart}
                  />
                );
              })}
            </ul>
            <div className="cart__total">
              <p className="cart__total--price">${cartSum}</p>
              <p className="cart__total--count" data-cy="productQauntity">
                Total for {cartQuantity} items
              </p>
              <div className="cart__total--line" />
              <button
                className="cart__total--checkout"
                type="button"
                onClick={() => setCheckoutMode(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {!checkoutMode && <h1 className="cart__title">Your cart is empty</h1>}
        </>
      )}
    </main>
  );
};
