import { useContext, useEffect, useState } from 'react';
import {
  CartDispatchContext,
  CartStateContext,
} from '../../shared/store/CartProvider';
import styles from './CartPage.module.scss';
import { DialogModal } from './components/DialogModal/DialogModal';
import { Link, useLocation } from 'react-router-dom';
import { CartProduct } from './components/CartProduct/CartProduct';
import { CartTotalPrice } from './components/CartTotalPrice/CartTotalPrice';
import { CartSkeleton } from './components/CartSkeleton/CartSkeleton';
import { CartTotalSkeleton } from './components/CartTotalSkeleton/CartTotalSkeleton';

import BackArrow from '../../assets/icons/slider-icons/left-arrow.svg';

export const CartPage = () => {
  const cartProducts = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  const [isModal, setIsModal] = useState(false);
  const [loadingByIds, setLoadingByIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = new Promise(resolve => setTimeout(resolve, 600));

    scrollTo(0, 0);
    timer.then(() => {
      setIsLoading(false);
    });
  }, [pathname]);

  const handleToDelete = async (id: number) => {
    setLoadingByIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev;
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    cartDispatch({ type: 'deleteCartProduct', payload: id });
  };

  const handleChangeQuantity = (id: number, amount: number) => {
    cartDispatch({
      type: 'updateCartProductQuantity',
      payload: { id, amount },
    });
  };

  return (
    <main className={styles.cart}>
      {isModal && <DialogModal setIsModal={setIsModal} />}
      <div className={styles.cart__container}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__backButtonWrapper}>
            <img
              src={BackArrow}
              alt="Повернутись назад"
              className={styles.cart__backArrowImg}
            />
            <Link to="/" className={styles.cart__backButton}>
              Back
            </Link>
          </div>
          <h1 className={styles.cart__title}>Cart</h1>
        </div>

        {cartProducts.length > 0 ? (
          <section className={styles.cart__items}>
            <div className={styles.cart__itemsWrapper}>
              {cartProducts.map(cartProduct =>
                isLoading ? (
                  <CartSkeleton key={cartProduct.id} />
                ) : (
                  <CartProduct
                    key={cartProduct.id}
                    cartProduct={cartProduct}
                    isLoading={loadingByIds.includes(cartProduct.id)}
                    handleToDelete={handleToDelete}
                    handleChangeQuantity={handleChangeQuantity}
                  />
                ),
              )}
            </div>
            {isLoading ? (
              <CartTotalSkeleton />
            ) : (
              <CartTotalPrice setIsModal={setIsModal} />
            )}
          </section>
        ) : (
          <h2 className={styles.cart__emptyTitle}>Your cart is empty</h2>
        )}
      </div>
    </main>
  );
};
