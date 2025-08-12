import { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../../shared/NavBar';
import { ProductList } from '../../shared/ProductList';
import { Footer } from '../Footer';
import styles from './Cart.module.scss';
import { Direction } from '../../shared/Direction/Direction';
import { BurgerMenu } from '../../shared/BurgerMenu';
import { ProductDemo } from '../../types/ProductDemo';
import { Loader } from '../../shared/Loader';

export const Cart: React.FC = () => {
  const { products, isMenuOpen, addIsPressed, isLoading } = useMyContext();
  const [orderList, setOrderList] = useState<ProductDemo[]>([]);
  const [amountPrice, setAmountPrice] = useState(0);
  const [amountItems, setAmountItems] = useState(0);
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

  useEffect(() => {
    const orders = products.filter(item => {
      const orderInStorage = localStorage.getItem(`cart_${item.itemId}`);

      return Boolean(orderInStorage);
    });

    setOrderList(orders);
  }, [products, addIsPressed, checkout]);

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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className={styles.shopping}>
                  <ProductList data={orderList} toCart={true} />
                </div>

                <div className={styles.total}>
                  <div className={styles.total_purchaseAmount}>
                    {orderList.length > 0 ? (
                      <>
                        <span className={styles.total_price}>
                          ${amountPrice}
                        </span>
                        <span className={styles.total_quantity}>
                          Total for {amountItems} items
                        </span>
                      </>
                    ) : products.length === 0 ? (
                      <Loader />
                    ) : (
                      <span className={styles.empty}>Your cart is empty</span>
                    )}

                    {/*----------- */}
                  </div>
                  <div className={styles.total_underline}></div>

                  <div className={styles.submit_container}>
                    <details>
                      <summary>Checkout</summary>
                      <div className={styles.cmc}>
                        <div className={styles.cmt}>
                          <p>
                            Checkout is not implemented yet. Do you want to
                            clear the Cart?
                          </p>
                          <div className={styles.submit_buttons}>
                            <button
                              className={styles.submit_button}
                              id="confirmBtn"
                              onClick={confirmModal}
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
                  </div>
                </div>
              </>
            )}
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};
