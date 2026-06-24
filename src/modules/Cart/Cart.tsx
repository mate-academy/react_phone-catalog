import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../../shared/NavBar/NavBar';
import { ProductList } from '../../shared/ProductList/ProductList';
import styles from './Cart.module.scss';
import { ProductDemo } from '../../types/ProductDemo';
import { Loader } from '../../shared/Loader';
import { Back } from '../../shared/Back';
import { BurgerMenu } from '../BurgerMenu';

export const Cart: React.FC = () => {
  const { products, isMenuOpen, addIsPressed, isLoading, setClearIsPressed } =
    useMyContext();

  const [orderList, setOrderList] = useState<ProductDemo[]>([]);
  const [amountPrice, setAmountPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0); // ✅ новий стейт
  const [checkout, setCheckout] = useState(false);

  const confirmModal = () => {
    products.forEach(product => {
      localStorage.removeItem(`cart_${product.itemId}`);
    });
    setCheckout(prev => !prev);

    const details = document.querySelector('details');

    details?.removeAttribute('open');
  };

  const closeModal = () => {
    const details = document.querySelector('details');

    details?.removeAttribute('open');
  };

  // отримуємо список замовлень із localStorage
  useEffect(() => {
    const orders = products.filter(item => {
      const orderInStorage = localStorage.getItem(`cart_${item.itemId}`);

      return Boolean(orderInStorage);
    });

    setOrderList(orders);
  }, [products, addIsPressed, checkout]);

  // рахуємо totalPrice і totalItems
  useEffect(() => {
    let totalPrice = 0;
    let itemsCount = 0; // ✅ не конфліктує зі стейтом

    orderList.forEach(product => {
      const jsonItem = localStorage.getItem(`cart_${product.itemId}`);

      if (!jsonItem) {
        return;
      }

      const storedItem: ProductDemo = JSON.parse(jsonItem);
      const quantity = storedItem.quantity || 1;
      const price = storedItem.price;

      totalPrice += quantity * price;
      itemsCount += quantity;
    });

    setAmountPrice(totalPrice);
    setTotalItems(itemsCount);
  }, [orderList]);

  return isMenuOpen ? (
    <BurgerMenu />
  ) : isLoading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Back />

          <h2 className={styles.content_title}>Cart</h2>
          <div className={styles.content_wrapper}>
            <div className={styles.shopping}>
              <ProductList data={orderList} toCart={true} />
            </div>
            <div className={styles.total}>
              <div className={styles.total_purchaseAmount}>
                {orderList.length > 0 ? (
                  <>
                    <span className={styles.total_price}>
                      ${amountPrice.toLocaleString('en-US')}
                    </span>
                    <span className={styles.total_quantity}>
                      Total for {totalItems} items
                    </span>
                  </>
                ) : products.length === 0 ? (
                  <Loader />
                ) : (
                  <span className={styles.empty}>Your cart is empty</span>
                )}
              </div>
              <div className={styles.total_underline}></div>
              <div className={styles.submit_container}>
                {orderList.length !== 0 && (
                  <details>
                    <summary>Checkout</summary>
                    <div className={styles.cmc}>
                      <div className={styles.cmt}>
                        <p>
                          Checkout is not implemented yet. Do you want to clear
                          the Cart?
                        </p>
                        <div className={styles.submit_buttons}>
                          <button
                            className={styles.submit_button}
                            id="confirmBtn"
                            onClick={() => {
                              confirmModal();
                              setClearIsPressed(prev => !prev);
                            }}
                          >
                            Yes, clear
                          </button>
                          <button
                            className={styles.submit_button}
                            id="cancelBtn"
                            onClick={closeModal}
                          >
                            No, keep it
                          </button>
                        </div>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
