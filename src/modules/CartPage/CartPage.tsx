import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import type { Product } from '../../types/Product';
import { getProducts } from '../../services/productService';
import { useCart } from '../../hooks/useCart';
import { BackButton } from '../../components/Ui/BackButton';
import { CartItem } from './components/CartItem';
import { Button } from '../../components/Ui/Button/';
import styles from './CartPage.module.scss';

const cx = classNames.bind(styles);

export const CartPage = () => {
  const { items, totalQuantity, clearCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    getProducts()
      .then(data => {
        if (!isCancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const cartProducts = useMemo(
    () =>
      items.flatMap(({ itemId, quantity }) => {
        const product = products.find(p => p.itemId === itemId);

        return product ? [{ product, quantity }] : [];
      }),
    [items, products],
  );

  const totalPrice = useMemo(
    () =>
      cartProducts.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0,
      ),
    [cartProducts],
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className={cx('cart-page__message')}>Loading...</p>;
    }

    if (hasError) {
      return (
        <p className={cx('cart-page__message')}>
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (cartProducts.length === 0) {
      return <p className={cx('cart-page__message')}>Your cart is empty</p>;
    }

    return (
      <div className={cx('cart-page__content')}>
        <div className={cx('cart-page__list')}>
          {cartProducts.map(({ product, quantity }) => (
            <CartItem
              key={product.itemId}
              product={product}
              quantity={quantity}
            />
          ))}
        </div>

        <aside className={cx('cart-page__summary')}>
          <div className={cx('cart-page__total')}>${totalPrice}</div>
          <div className={cx('cart-page__total-label')}>
            Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </div>

          <hr className={cx('cart-page__divider')} />

          <Button onClick={handleCheckout}>Checkout</Button>
        </aside>
      </div>
    );
  };

  return (
    <main className={cx('cart-page')}>
      <BackButton fallbackTo="/" />

      <h1 className={cx('cart-page__title')}>Cart</h1>

      {renderContent()}
    </main>
  );
};
