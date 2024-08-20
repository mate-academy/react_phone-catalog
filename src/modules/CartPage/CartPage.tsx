import { useContext, useState } from 'react';
import styles from './CartPage.module.scss';
import { AppContext } from '../../utils/AppContext';
import { DataTypes, getData } from '../../utils/ApiClient';
import { Product } from '../../types/Product';
import { Loader } from '../../shared/components/Loader/Loader';
import arrowBack from './icons/arrowBack.svg';
import whiteBack from './icons/whiteLeft.svg';
import { CartItemCard } from './components/CartItemCard/CartItemCard';
import classNames from 'classnames';

export const CartPage = () => {
  const { inCartItems, setInCartItems, isDarkTheme } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartItemsList, setCartItemsList] = useState<Product[]>([]);

  const totalSum = () => {
    let sum = 0;

    inCartItems.map(itemName => {
      const targetItem = cartItemsList.find(item => item.name === itemName);

      if (targetItem) {
        sum += targetItem.price;
      }
    });

    return sum;
  };

  getData(DataTypes.products)
    .then(items =>
      setCartItemsList(
        items.filter((item: Product) => inCartItems.includes(item.name)),
      ),
    )
    .finally(() => setIsLoading(false));

  const handleCheckOut = () => {
    if (!inCartItems.length) {
      return;
    }

    setIsCheckingOut(true);
  };

  const handleWarning = (answer: string) => {
    switch (answer) {
      case 'yes':
        setInCartItems([]);
        setIsCheckingOut(false);

        return;
      default:
        setIsCheckingOut(false);

        return;
    }
  };

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      <section className={styles.cart}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.heading}>
              <div className={styles.goBack}>
                <div
                  className={classNames(
                    styles.goBack__arrow,
                    isDarkTheme ? styles.goBack__arrowDark : '',
                  )}
                  style={
                    isDarkTheme
                      ? { backgroundImage: `url(${whiteBack})` }
                      : { backgroundImage: `url(${arrowBack})` }
                  }
                ></div>
                <span
                  className={classNames(
                    styles.goBack__link,
                    isDarkTheme ? styles.goBack__linkDark : '',
                  )}
                  onClick={() => window.history.go(-1)}
                >
                  Back
                </span>
              </div>

              <h1
                className={classNames(
                  styles.heading__title,
                  isDarkTheme ? styles.heading__titleDark : '',
                )}
              >
                Cart
              </h1>
            </div>

            <div className={styles.cartItems}>
              <div className={styles.cartItems__products}>
                {!cartItemsList.length ? (
                  <p
                    className={classNames(
                      styles.warning,
                      isDarkTheme ? styles.warningDark : '',
                    )}
                  >
                    Your cart is empty{' '}
                  </p>
                ) : (
                  cartItemsList.map(item => (
                    <CartItemCard key={item.id} product={item} />
                  ))
                )}
              </div>

              {!!inCartItems.length && (
                <div
                  className={classNames(
                    styles.checkout,
                    isDarkTheme ? styles.checkoutDark : '',
                  )}
                >
                  <div className={styles.total}>
                    <div
                      className={classNames(
                        styles.total__sum,
                        isDarkTheme ? styles.total__sumDark : '',
                      )}
                    >
                      ${totalSum()}
                    </div>
                    <div
                      className={classNames(
                        styles.total__quantity,
                        isDarkTheme ? styles.total__quantityDark : '',
                      )}
                    >
                      {inCartItems.length === 1
                        ? `Total for 1 item`
                        : `Total for ${inCartItems.length} items`}
                    </div>
                  </div>

                  <div
                    className={classNames(
                      styles.checkout__line,
                      isDarkTheme ? styles.checkout__lineDark : '',
                    )}
                  ></div>

                  <div
                    className={classNames(
                      styles.button,
                      isDarkTheme ? styles.buttonDark : '',
                    )}
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {isCheckingOut && (
          <>
            <div className={styles.confirmWarning}></div>

            <div className={styles.confirmWarning__container}>
              <div className={styles.confirmWarning__message}>
                <p>Checkout is not implemented yet.</p>
                <p>Do you want to clear the Cart?</p>
              </div>

              <div className={styles.confirmWarning__buttons}>
                <div
                  className={classNames(
                    styles.button,
                    styles.confirmWarning__button,
                  )}
                  onClick={() => handleWarning('yes')}
                >
                  Yes
                </div>
                <div
                  className={classNames(
                    styles.button,
                    styles.confirmWarning__button,
                  )}
                  onClick={() => handleWarning('no')}
                >
                  No
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};
