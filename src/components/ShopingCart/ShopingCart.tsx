import { useShoping } from '../../context/ShopingProvider';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/Header';
import styles from './shopingcart.module.scss';
import imgstyles from '../Favorite/favorite.module.scss';
import { useEffect, useState } from 'react';

export const ShopingCart = () => {
  const { addetDevice } = useShoping();
  const { addToCart } = useShoping();
  const [coutPrice, setCountPrice] = useState(0);
  const [countItems, setCountItems] = useState<Record<number, number>>({});

  useEffect(() => {
    const storedCounts = localStorage.getItem('countItems');

    if (storedCounts) {
      setCountItems(JSON.parse(storedCounts));
    }
  }, []);

  const addCount = (id: number) => {
    setCountItems(prevCounts => {
      const newCounts = {
        ...prevCounts,
        [id]: (prevCounts[id] || 1) + 1,
      };

      localStorage.setItem('countItems', JSON.stringify(newCounts));

      return newCounts;
    });
  };

  const subtractCount = (id: number) => {
    setCountItems(prevCounts => {
      const newCounts = {
        ...prevCounts,
        [id]: prevCounts[id] > 1 ? prevCounts[id] - 1 : 1,
      };

      localStorage.setItem('countItems', JSON.stringify(newCounts));

      return newCounts;
    });
  };

  useEffect(() => {
    if (addetDevice.length > 0) {
      setCountPrice(
        addetDevice.reduce((total, device) => {
          if ('price' in device) {
            return total + device.price * (countItems[device.id] || 1);
          }

          return total;
        }, 0),
      );
    }
  }, [addetDevice, countItems]);

  return (
    <div>
      <Header />

      <div>
        <h1 className={styles.shoping_h1}>Cart</h1>
      </div>

      <div className={styles.shoping_container}>
        <div className={styles.shoping}>
          {addetDevice.map(device => (
            <>
              <div className={styles.shoping_cart}>
                <div onClick={() => addToCart(device)}>
                  <img
                    src="img/Union.svg"
                    alt=""
                    className={styles.shoping_cart_button}
                  />
                </div>
                <div className={styles.shoping_name}>
                  <img
                    src={`${'image' in device && device.image}`}
                    alt="img"
                    className={styles.shoping_cart_icon}
                  />
                  <div>
                    <span>{device.name}</span>
                  </div>
                </div>

                <div className={styles.buttons}>
                  <button
                    className={styles.buttons_counter}
                    onClick={() => subtractCount(Number(device.id))}
                  >
                    <img
                      src="img/minus.svg"
                      alt=""
                      className={styles.buttons_counter_mini}
                    />
                  </button>
                  <span>{countItems[Number(device.id)] || 1}</span>
                  <button
                    className={styles.buttons_counter}
                    onClick={() => addCount(Number(device.id))}
                  >
                    <img
                      src="img/plus.svg"
                      alt=""
                      className={styles.buttons_counter_mini}
                    />
                  </button>
                </div>

                <div className={styles.shoping_price}>
                  ${'price' in device && device.price}
                </div>
              </div>
            </>
          ))}
        </div>

        {addetDevice.length > 0 ? (
          <div className={styles.checkout}>
            <div className={styles.checkout_container}>
              <div className={styles.checkout_price}>
                <div className={styles.checkout_price_cash}>${coutPrice}</div>
                <div className={styles.checkout_price_total}>
                  total for {addetDevice.length} items
                </div>
              </div>
              <div>
                <button className={styles.checkout_buttom}>Checkout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={imgstyles.cart_container}>
            <img
              src="img/cart-is-empty.png"
              alt="logo"
              className={imgstyles.cart_img}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
