import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/HeaderComponent';
import styles from './shopingcart.module.scss';
import imgstyles from '../Favorite/favorite.module.scss';
import { useEffect, useState } from 'react';
import { DeviceProps, useDevices } from '../../context/DeviceProvider';

export const ShopingCart = () => {
  const { addedDevice } = useDevices();
  const { addToCart } = useDevices();
  const [coutPrice, setCountPrice] = useState(1);
  const [countItems, setCountItems] = useState<Record<number, number>>({});
  const counts = Object.values(countItems).reduce(
    (acc, count) => acc + count,
    0,
  );

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
        [id]: (prevCounts[id] || 0) + 1,
      };

      localStorage.setItem('countItems', JSON.stringify(newCounts));

      return newCounts;
    });
  };

  const handleDelete = (device: DeviceProps) => {
    addToCart(device);

    if (device.id in countItems) {
      const updatedCounts = { ...countItems };

      delete updatedCounts[device.id as number];
      setCountItems(updatedCounts);
      localStorage.setItem('countItems', JSON.stringify(updatedCounts));
    }
  };

  const subtractCount = (id: number) => {
    setCountItems(prevCounts => {
      const newCounts = { ...prevCounts };

      if (newCounts[id] > 1) {
        newCounts[id] -= 1;
      } else {
        delete newCounts[id];
      }

      localStorage.setItem('countItems', JSON.stringify(newCounts));

      return newCounts;
    });
  };

  useEffect(() => {
    if (addedDevice.length > 0) {
      setCountPrice(
        addedDevice.reduce((total, device) => {
          if ('price' in device) {
            return total + device.price * (countItems[device.id] || 1);
          }

          return total;
        }, 0),
      );
    }
  }, [addedDevice, countItems]);

  return (
    <div className={imgstyles.cart_page_container}>
      <Header countItems={counts} />

      <div>
        <h1 className={styles.shoping_h1}>Cart</h1>
      </div>

      <div className={styles.shoping_container}>
        <div className={styles.shoping}>
          {addedDevice.map(device => (
            <>
              <div className={styles.shoping_cart}>
                <div className={styles.shoping_cart_left}>
                  <div onClick={() => handleDelete(device)}>
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
                    <div className={styles.shoping_cart_left_container}>
                      <span>{device.name}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.shoping_cart_bottom}>
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
                    <span>
                      {countItems[Number(device.id)] >= 1
                        ? 1 + countItems[Number(device.id)]
                        : 1}
                    </span>
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
              </div>
            </>
          ))}
        </div>

        {addedDevice.length > 0 ? (
          <div className={styles.checkout}>
            <div className={styles.checkout_container}>
              <div className={styles.checkout_price}>
                <div className={styles.checkout_price_cash}>${coutPrice}</div>
                <div className={styles.checkout_price_total}>
                  total for {addedDevice.length + (counts ?? 0)} items
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
