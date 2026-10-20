import styles from './CartPage.module.scss';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { useCart } from '../../hooks';
import { PhoneDetails, ProductDetails, TabletDetails } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { getPhones } from '../../api/phones';
import { getAccessories } from '../../api/accessories';
import { getTablets } from '../../api/tablets';

// import { ProductCardSkeleton } from '../../components/Loaders';

import { CartItem } from '../../components/CardItem';
import { CartItemSkeleton } from '../../components/Loaders/CartItemSkeleton';

export const CartPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<boolean>(false);

  const { cartIds, cartQuantities, clearCart } = useCart();

  const [phones, setPhones] = useState<PhoneDetails[]>([]);
  const [tablets, setTablets] = useState<TabletDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  const allProducts = [...phones, ...tablets, ...accessories];

  const filteredCartProducts = allProducts.filter(product => {
    return cartIds.includes(product.id);
  });

  const total = useMemo(() => {
    return filteredCartProducts.reduce((sum, product) => {
      const quantity = cartQuantities[product.id] || 1;

      return sum + Number(product.priceDiscount) * quantity;
    }, 0);
  }, [filteredCartProducts, cartQuantities]);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    Promise.all([getPhones(), getTablets(), getAccessories()])
      .then(([phone, tablet, accessorie]) => {
        setPhones(phone);
        setTablets(tablet);
        setAccessories(accessorie);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <section className={styles.cart}>
      <IconTrail name="Cart" choseProduct={null} />
      <section className={styles.cart__title}>
        <h1>Cart</h1>
      </section>
      <section className={styles.cart__amount}>
        <p>{cartIds.length} itens</p>
      </section>
      <section className={styles.cart__products}>
        {hasError && <p>Error loading cart</p>}

        {isLoading &&
          Array.from({ length: Math.max(cartIds.length, 1) }).map(
            (_, index) => <CartItemSkeleton key={index} />,
          )}

        {!isLoading &&
          !hasError &&
          filteredCartProducts.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
      </section>
      <section className={styles.cart__total}>
        <div className={`${styles['cart__total--value']}`}>
          <h2>${total}</h2>
          <p>Total for {cartIds.length} itens</p>
        </div>

        <div className={`${styles['cart__total--line']}`}></div>

        <div className={`${styles['cart__total--checkout']}`}>
          <button
            onClick={() => {
              setCheckout(true);
            }}
          >
            Checkout
          </button>
        </div>
      </section>
      {checkout && (
        <section className={styles.cart__modal}>
          <div className={`${styles['cart__modal--content']}`}>
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>

            <div className={`${styles['cart__modal--actions']}`}>
              <button
                onClick={() => {
                  clearCart();
                  setCheckout(false);
                }}
              >
                Yes, I confirm
              </button>
              <button onClick={() => setCheckout(false)}>Cancel</button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};
