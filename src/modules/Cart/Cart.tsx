import { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../../shared/NavBar';
import { ProductList } from '../../shared/ProductList';
import { Footer } from '../Footer';
import styles from './Cart.module.scss';
import { Direction } from '../../shared/Direction/Direction';
import { BurgerMenu } from '../../shared/BurgerMenu';
import { ProductDemo } from '../../types/ProductDemo';

export const Cart: React.FC = () => {
  const { products, isMenuOpen } = useMyContext();
  const [orderList, setOrderList] = useState<ProductDemo[]>([]);
  const [amountPrice, setAmountPrice] = useState(0);
  const [amountItems, setAmountItems] = useState(0);

  useEffect(() => {
    const findOrders = () => {
      const orders: ProductDemo[] = [];

      products.forEach(product => {
        const orderInStorage = localStorage.getItem(`cart_${product.itemId}`);

        if (orderInStorage) {
          orders.push(product);
        }
      });

      const price = orders.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);

      const sumOfItems = orders.reduce((total, item) => {
        return total + (item.quantity || 1);
      }, 0);

      setOrderList(orders);
      setAmountPrice(price);
      setAmountItems(sumOfItems);
    };

    findOrders();
  }, [products]);

  return (
    <div className={styles.container}>
      {isMenuOpen ? (
        <BurgerMenu />
      ) : (
        <>
          <NavBar />

          <div className={styles.content}>
            <Direction page="cart" />

            <h2 className={styles.content_title}>Cart</h2>

            <div className={styles.shopping}>
              <ProductList data={orderList} toCart={true} />
            </div>

            <div className={styles.total}>
              <div className={styles.total_purchaseAmount}>
                <span className={styles.total_price}>{`$${amountPrice}`}</span>
                <span
                  className={styles.total_quantity}
                >{`Total for ${amountItems} items`}</span>
                {/*----------- */}
              </div>
              <div className={styles.total_underline}></div>
              <button className={styles.total_submit}>Checkout</button>
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};
