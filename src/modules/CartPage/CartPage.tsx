import styles from './CartPage.module.scss';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { useCart } from '../../hooks';
import { PhoneDetails, ProductDetails, TabletDetails } from '../../types';
import { useEffect, useState } from 'react';
import { getPhones } from '../../api/phones';
import { getAccessories } from '../../api/accessories';
import { getTablets } from '../../api/tablets';

import { ProductCardSkeleton } from '../../components/Loaders';
import { CartItem } from '../../components/CardItem';

export const CartPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { cartIds } = useCart();

  const [phones, setPhones] = useState<PhoneDetails[]>([]);
  const [tablets, setTablets] = useState<TabletDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  const allProducts = [...phones, ...tablets, ...accessories];

  const filteredCartProducts = allProducts.filter(product => {
    return cartIds.includes(product.id);
  });

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
        <h1>Card</h1>
      </section>
      <section className={styles.cart__amount}>
        <p>{cartIds.length} itens</p>
      </section>
      <div className={styles.cart__products}>
        {hasError && <p>Error loading cart</p>}

        {isLoading &&
          Array.from({ length: cartIds.length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {!isLoading &&
          !hasError &&
          filteredCartProducts.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};
