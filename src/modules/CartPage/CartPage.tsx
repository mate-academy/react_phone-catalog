import React from 'react';
import styles from './CartPage.module.scss';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/type';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';
import { removeProduct, increment, decrement } from '../../services/cart';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';
import { ErrorPage } from '../ErrorPage';

export const CartPage: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  const dispatch = useDispatch();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const cart: { id: string; quantity: number }[] = useSelector(
    (state: RootState) => state.cart,
  );

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const productsInCart = products
    ? products.filter(product => cart.some(item => item.id === product.itemId))
    : [];

  const handleRemoveProduct = (itemId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeProduct(itemId));
  };

  const handleIncrement = (itemId: string) => () => {
    dispatch(increment(itemId));
  };

  const handleDecrement = (itemId: string) => () => {
    dispatch(decrement(itemId));
  };

  const totalPrice = cart.reduce((acc, item) => {
    const product = products?.find(p => p.itemId === item.id);

    if (product) {
      // eslint-disable-next-line no-param-reassign
      acc += product.price * item.quantity;
    }

    return acc;
  }, 0);

  if (error) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <section className={styles.cart}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.cart__title}>Cart</h1>

          {productsInCart.length === 0 && (
            <div className={styles.cart__empty}>
              <h2 className={styles.cart__emptyTitle}>Cart is empty</h2>
              <img
                className={styles.cart__emptyImg}
                src="./img/cart-is-empty.png"
                alt="Cart is empty"
              />
            </div>
          )}
          <div className={styles.cart__content}>
            <div className={styles.cart__products}>
              {productsInCart.map(product => {
                const cartItem = cart.find(item => item.id === product.itemId);
                const quantity = cartItem?.quantity ?? 0;
                const productPrice = product.price * quantity;

                return (
                  <CartItem
                    key={product.itemId}
                    product={product}
                    quantity={quantity}
                    productPrice={productPrice}
                    onRemove={handleRemoveProduct}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                  />
                );
              })}
            </div>
            {productsInCart.length > 0 && (
              <CartTotal
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
