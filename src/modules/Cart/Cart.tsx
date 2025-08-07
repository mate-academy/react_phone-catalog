import { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../../shared/NavBar';
import { ProductList } from '../../shared/ProductList';
import { Footer } from '../Footer';
import styles from './Cart.module.scss';
import { Direction } from '../../shared/Direction/Direction';
import { BurgerMenu } from '../../shared/BurgerMenu';
import { ProductDemo } from '../../types/ProductDemo';
import { spawn } from 'child_process';

export const Cart: React.FC = () => {
  const { products, isMenuOpen } = useMyContext();
  const [orderList, setOrderList] = useState<ProductDemo[]>([]);
  const [amountPrice, setAmountPrice] = useState(0);
  const [amountItems, setAmountItems] = useState(0);
  const [quantityChanged, setQuantityChanged] = useState<boolean>(false);

  useEffect(() => {
    const orders = products.filter(item => {
      const orderInStorage = localStorage.getItem(`cart_${item.itemId}`);

      return Boolean(orderInStorage);
    });

    setOrderList(orders);
  }, [products, quantityChanged]);

  useEffect(() => {
    let totalPrice = 0;
    let totalItems = 0;

    orderList.forEach(product => {
      const jsonItem = localStorage.getItem(`cart_${product.itemId}`);

      if (!jsonItem) {
        return;
      }

      const storedItem: ProductDemo = JSON.parse(jsonItem);
      const quantity = storedItem.quantity || 1;
      const price = storedItem.price;

      totalItems += quantity;
      totalPrice += quantity * price;
    });

    setAmountItems(totalItems);
    setAmountPrice(totalPrice);
  }, [orderList]);

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
              <ProductList
                data={orderList}
                toCart={true}
                setQuantityChanged={setQuantityChanged}
              />
            </div>

            <div className={styles.total}>
              <div className={styles.total_purchaseAmount}>
                {orderList.length > 0 ? (
                  <>
                    <span className={styles.total_price}>${amountPrice}</span>
                    <span className={styles.total_quantity}>
                      Total for {amountItems} items
                    </span>
                  </>
                ) : (
                  <span className={styles.empty}>Your cart is empty</span>
                )}

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
