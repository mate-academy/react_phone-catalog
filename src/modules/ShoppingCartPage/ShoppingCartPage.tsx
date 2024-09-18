import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../shared/contexts';
import styles from '../ShoppingCartPage/ShoppingCartPage.module.scss';
import { Product } from '../shared/types';

export const ShoppingCartPage = () => {
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
  const [isModal, setIsModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleSize);
    handleSize();

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, [isMobile]);

  const getUniqueItemsForRender = (items: Product[]): Product[] => {
    return items.reduce((unique: Product[], item: Product) => {
      if (!unique.some(i => i.id === item.id)) {
        unique.push(item);
      }

      return unique;
    }, []);
  };

  const uniqueItemsForRender = getUniqueItemsForRender(cartItems);

  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }

  const increase = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const decrease = (product: Product) => {
    const lastIndex = cartItems
      .map((item, index) => (item.id === product.id ? index : -1))
      .filter(index => index !== -1)
      .pop();

    if (lastIndex === undefined) {
      return;
    }

    const updatedCartItems = [
      ...cartItems.slice(0, lastIndex),
      ...cartItems.slice(lastIndex + 1),
    ];

    setCartItems(updatedCartItems);
  };

  const countItemsById = (items: Product[], id: number): number => {
    return items.filter(item => item.id === id).length;
  };

  const totalPrice = cartItems.reduce((acc, curItem) => acc + curItem.price, 0);
  const totalNumber = cartItems.reduce(acc => acc + 1, 0);

  const clearCart = () => {
    setCartItems([]);
    setIsModal(false);
  };

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.cartPage}>
        <div className={styles.backContainer}>
          <div className={styles.backSeparator}></div>
          <button onClick={goBack} className={styles.backBtn}>
            Back
          </button>
        </div>

        <h1 className={styles.cartPageTitle}>Cart</h1>

        <div className={styles.cartList}>
          {uniqueItemsForRender.length > 0 ? (
            uniqueItemsForRender.map(item =>
              !isMobile ? (
                <div key={item.id} className={styles.itemContainer}>
                  <div
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  ></div>
                  <div className={styles.itemImgContainer}>
                    <img
                      className={styles.itemImg}
                      src={`${item.image}`}
                      alt="cart item image"
                    />
                  </div>

                  <p className={styles.itemName}>{item.name}</p>

                  <div className={styles.counterContainer}>
                    <div
                      className={styles.decreaseBtn}
                      onClick={() => decrease(item)}
                    ></div>
                    <div className={styles.countNumber}>
                      {countItemsById(cartItems, item.id)}
                    </div>
                    <div
                      className={styles.increaseBtn}
                      onClick={() => increase(item)}
                    ></div>
                  </div>

                  <div className={styles.itemSumPrice}>
                    {`$${countItemsById(cartItems, item.id) * item.price}`}
                  </div>
                </div>
              ) : (
                <div key={item.id} className={styles.itemContainer}>
                  <div className={styles.mobileItemContainerName}>
                    <div
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    ></div>
                    <div className={styles.itemImgContainer}>
                      <img
                        className={styles.itemImg}
                        src={`${item.image}`}
                        alt="cart item image"
                      />
                    </div>

                    <p className={styles.itemName}>{item.name}</p>
                  </div>

                  <div className={styles.mobileItemContainerCounter}>
                    <div className={styles.counterContainer}>
                      <div
                        className={styles.decreaseBtn}
                        onClick={() => decrease(item)}
                      ></div>
                      <div className={styles.countNumber}>
                        {countItemsById(cartItems, item.id)}
                      </div>
                      <div
                        className={styles.increaseBtn}
                        onClick={() => increase(item)}
                      ></div>
                    </div>

                    <div className={styles.itemSumPrice}>
                      {`$${countItemsById(cartItems, item.id) * item.price}`}
                    </div>
                  </div>
                </div>
              ),
            )
          ) : (
            <h1 className={styles.emptyCartMessage}>Your cart is empty</h1>
          )}
        </div>

        <div className={styles.totalContainer}>
          <p className={styles.totalSum}>{`$${totalPrice}`}</p>
          <p
            className={styles.totalCounter}
          >{`Total for ${totalNumber} items`}</p>
          <div className={styles.totalSeparator}></div>
          <button
            className={styles.checkoutBtn}
            onClick={() => setIsModal(true)}
          >
            Checkout
          </button>
        </div>
      </div>

      {isModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p
              className={styles.modalText}
            >{`Checkout is not implemented yet. Do you want to clear the Cart?`}</p>
            <div className={styles.modalBtnContainer}>
              <div className={styles.btnModal} onClick={() => clearCart()}>
                Yes
              </div>
              <div
                className={styles.btnModal}
                onClick={() => setIsModal(false)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
