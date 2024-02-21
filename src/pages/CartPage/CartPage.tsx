import { useContext, useEffect, useState } from 'react';

import './CartPage.scss';
import { MyBackLink } from '../../components/UI/MyBackLink';
import { MyLoader } from '../../components/UI/MyLoader';
import { MyButton } from '../../components/UI/MyButton';
import { CartItem } from '../../components/CartItem';

import { StateContext } from '../../store/State';
import { getLocalStorigeData } from '../../helpers/localStorageHelper';
import { Cart } from '../../types/cart';

export const CartPage = () => {
  const { cart } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Cart>([]);

  const cartData = cart.reduce((acc, item) => {
    return {
      totalPrice: acc.totalPrice + item.price * item.quantity,
      quantity: acc.quantity + item.quantity,
    };
  }, { totalPrice: 0, quantity: 0 });

  const { totalPrice, quantity } = cartData;

  useEffect(() => {
    const currentCart = getLocalStorigeData('cart');

    setProducts(currentCart);
    setLoading(false);
  }, [cart]);

  return (
    <section className="cart-page">
      <MyBackLink />
      <h1 className="cart-page__title">Cart</h1>

      {loading
        ? <MyLoader />
        : (
          <div className="cart-page__products">
            <div className="cart-page__list">
              {products.map(item => (
                <CartItem
                  key={item.image}
                  product={item}
                />
              ))}
            </div>

            <div className="cart-page__total">
              <p className="cart-page__total-price">{`$${totalPrice}`}</p>
              <p className="cart-page__total-quantity">{`Total for ${quantity} items`}</p>

              <MyButton
                handleClick={() => {}}
              >
                Checkout
              </MyButton>
            </div>
          </div>
        )}
    </section>
  );
};
