/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useState } from 'react';
import { GoBackLink } from '../shared/components/GoBackLink';
import { CartItemBlock } from './components/CartItem';
import s from './CartPage.module.scss';
import { CartProduct } from '../../types/Cart';
import { ModalLayout } from '../shared/components/ModalLayout';
import { useCartContext } from '../../context/CartContext';
//import { getAllProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Loader } from '../shared/components/Loader';
import { ErrorNotice } from '../shared/components/ErrorNotice';
import { useAllProducts } from './hooks/useAllProducts';

export const CartPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const { cartItems, cartCount, clearCart } = useCartContext();
  const { products, isLoading, errorMessage } = useAllProducts();

  useEffect(() => {
    if (!products.length) {
      return;
    }

    const mapped = cartItems.map(item => {
      const product = products.find(
        p => p.itemId === item.productId,
      ) as Product;

      return {
        product,
        quantity: item.quantity,
        id: Math.random(),
      };
    });

    setCartProducts(mapped);
  }, [cartItems, products]);

  const cartTotalAmount = cartProducts.reduce(
    (amount, item) => amount + item.quantity * item.product.price,
    0,
  );
  const onCheckout = () => setIsModalOpen(true);
  const onConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const checkoutTitle = 'Checkout is not implemented yet.';
  const checkoutText = 'Do you want to clear the Cart?';

  return (
    <main>
      <section className={`${s.container} ${s.cartPage}`}>
        <GoBackLink />
        <h1>Cart</h1>
        {isLoading && <Loader />}
        {errorMessage && (
          <ErrorNotice
            message={errorMessage}
            onReload={() => window.location.reload()}
          />
        )}
        {cartProducts.length === 0 && 'Your cart is empty'}
        {!isLoading && !errorMessage && cartProducts.length > 0 && (
          <div className={s.cartContent}>
            <div className={s.cartItems}>
              {cartProducts.map(item => (
                <CartItemBlock key={item.product.itemId} item={item} />
              ))}
            </div>
            <div className={s.cartTotalBlock}>
              <div className={s.cartTotal}>
                <span className={s.cartPrice}>${cartTotalAmount}</span>
                <span className={s.cartCount}>Total for {cartCount} items</span>
              </div>
              <button
                type="button"
                className={s.cartButton}
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
      {isModalOpen && (
        <ModalLayout
          title={checkoutTitle}
          text={checkoutText}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={onConfirm}
        />
      )}
    </main>
  );
};
