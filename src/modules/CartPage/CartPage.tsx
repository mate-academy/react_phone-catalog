import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './CartPage.module.scss';

import { Dialog } from './components/Dialog';
import { CartProduct } from './components/CartProduct';
import { CartTotalPrice } from './components/CartTotalPrice';

import CartArrow from '../../assets/icons/cart-icons/cart-arrow-icon.svg';
import { CartSkeleton } from './components/CartSkeleton';
import { CartTotalSkeleton } from './components/CartTotalSkeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteCartProduct,
  updateCartProductQuantity,
} from '../../store/cartSlice/cartSlice';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingByIds, setLoadingByIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  const cartsProduct = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = new Promise(resolve => setTimeout(resolve, 600));

    timer.then(() => {
      setIsLoading(false);
    });
  }, [pathname]);

  const handleDeleteProduct = async (id: number) => {
    setLoadingByIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev;
      }
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    dispatch(deleteCartProduct(id));
  };

  const handleChangeQuantity = (id: number, amount: number) => {
    dispatch(updateCartProductQuantity({ id, amount }));
  };

  return (
    <main className={styles.cart}>
      {isModalOpen && <Dialog setIsModalOpen={setIsModalOpen} />}
      <div className={styles.cart__container}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__backButtonWrapper}>
            <img
              src={CartArrow}
              alt="Повернутись назад"
              className={styles.cart__backArrowImg}
            />
            <Link to="/" className={styles.cart__backButton}>
              Back
            </Link>
          </div>
          <h1 className={styles.cart__title}>Cart</h1>
        </div>

        {cartsProduct.length > 0 ? (
          <section className={styles.cart__items}>
            <div className={styles.cart__itemsWrapper}>
              {cartsProduct.map(cartProduct =>
                isLoading ? (
                  <CartSkeleton key={cartProduct.id} />
                ) : (
                  <CartProduct
                    key={cartProduct.id}
                    cartProduct={cartProduct}
                    isLoading={loadingByIds.includes(cartProduct.id)}
                    deleteProduct={handleDeleteProduct}
                    changeQuantity={handleChangeQuantity}
                  />
                ),
              )}
            </div>

            {isLoading ? (
              <CartTotalSkeleton />
            ) : (
              <CartTotalPrice setIsModalOpen={setIsModalOpen} />
            )}
          </section>
        ) : (
          <h2 className={styles.cart__emptyTitle}>Your cart is empty</h2>
        )}
      </div>
    </main>
  );
};
