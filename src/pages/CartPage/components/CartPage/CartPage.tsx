import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../context/AppContext';
import { CartItem } from '../CartItem';
import { BackLink } from '../../../shared/components/BackLink';
import { CartProduct } from '../../../../types/CartProduct';
import './CartPage.scss';
import '../../../../styles/main.scss';

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    const newProducts: CartProduct[] = [];

    for (const key in cartProducts) {
      newProducts.push({
        product: cartProducts[key].product,
        quantity: cartProducts[key].quantity,
      });
    }

    setProducts(newProducts);
  }, [cartProducts]);

  return (
    <main className="cart-page">
      <section className="cart-page__top">
        <BackLink />
        <h1 className="cart-page__title title--1">Cart</h1>
      </section>

      {!products.length ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <section className="cart-page__items">
            {products.map((item: CartProduct) => {
              return (
                <div style={{ display: 'flex' }} key={item.product.id}>
                  <CartItem product={item.product} quantity={item.quantity} />
                </div>
              );
            })}
          </section>
          <section className="cart-page__total">
            Total:
            {/* TODO ----- PUT NEW CART-TOTAL COMPONENT */}
            {products.reduce((sum, currentCartProduct: CartProduct) => {
              return (
                sum +
                currentCartProduct.product.price * currentCartProduct.quantity
              );
            }, 0)}
          </section>
        </>
      )}
    </main>
  );
};
