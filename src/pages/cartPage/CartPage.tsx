import { useCallback, useMemo, useState } from 'react';
import { CartItemWidget } from './ui/CartItemWidget';
import { useGlobalData } from '@features/index';
import styles from './styles/cartPage.module.scss';

export const CartPage = () => {
  const { itemsInCart } = useGlobalData();
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};

    itemsInCart.forEach(item => {
      initial[item.id] = 0;
    });

    return initial;
  });

  const updatePrice = useCallback((id: string, price: number) => {
    setPrices(prev => ({
      ...prev,
      [id]: price,
    }));
  }, []);

  const allPricesLoaded = useMemo(() => {
    return itemsInCart.every(item => prices[item.id] && prices[item.id] !== 0);
  }, [prices, itemsInCart]);

  const totalPrice = useMemo(() => {
    return Object.values(prices).reduce((sum, price) => sum + price, 0);
  }, [prices]);

  return (
    <main className={styles['layout-container']}>
      <section aria-labelledby="fav-heading">
        <h1 id="fav-heading">Cart</h1>
        <ul className={styles['cart-list']}>
          {itemsInCart.map(el => (
            <CartItemWidget key={el.id} item={el} updatePrice={updatePrice} />
          ))}
        </ul>

        <div className="total">
          {allPricesLoaded ? (
            <span>Total: ${totalPrice}</span>
          ) : (
            <span>Calculating...</span>
          )}
        </div>
      </section>
    </main>
  );
};
