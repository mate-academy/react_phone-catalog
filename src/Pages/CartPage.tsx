import React, { useState } from 'react';
import { Cart } from '../components/Cart/Cart';
import { Fail } from '../elements/Empty/Fail';
import { useAppSelector } from '../store/hooks';
import { Line } from '../elements/Line/Line';

export const CartPage: React.FC = () => {
  const cartedProducts = useAppSelector(state => state.cartedProducts);
  const [totalPrice, setTotalPrice] = useState<number>(cartedProducts
    .reduce((sum, cart) => sum + cart.price, 0) || 0);

  return (
    <div className="page">
      {!cartedProducts.length ? (
        <Fail title="Your cart is empty" />
      ) : (
        <>
          <h1 className="page__title-h1 page__title-h1--product">Cart</h1>
          <div className="page__content">
            <section className="page__section page__section--cart">
              <ul className="page__carts">
                {cartedProducts.map(product => (
                  <li className="page__cart-items" key={product.id}>
                    <Cart product={product} setTotalPrice={setTotalPrice} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="
            page__section
            page__section--cart page__section--price-block"
            >
              <div className="page__total-price-block">
                <p className="page__total-price">
                  {`$${totalPrice}`}
                </p>
                <p className="page__total-price-text">{cartedProducts.length > 1 ? `Total for ${cartedProducts.length} items` : 'Total for 1 item'}</p>
              </div>

              <Line revert />

              <div className="page__checkout">Checkout</div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
