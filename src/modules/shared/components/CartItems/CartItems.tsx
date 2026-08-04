import { useNavigate } from 'react-router-dom';
import styles from './CartItems.module.scss';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useEffect, useMemo, useState } from 'react';
import { Products } from '../../types/Products';
import { getAllDetailedProducts } from '../../utils/api';
import { Loader } from '../Loader';

export const CartItems = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { addedDevice, toggleAdded } = useFavourites();

  useEffect(() => {
    setLoader(true);
    getAllDetailedProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage('Something wrong, please try again');
        setLoader(false);
      })
      .finally(() => setLoader(false));
  }, []);

  const [cartCounts, setCartCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('cartCounts');

    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(cartCounts));
  }, [cartCounts]);

  const increaseCount = (id: string) => {
    setCartCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseCount = (id: string) => {
    setCartCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const devices = useMemo(() => {
    return products?.filter(product => addedDevice.includes(product.id)) ?? [];
  }, [products, addedDevice]);

  let sum = 0;

  for (const ch in cartCounts) {
    sum +=
      cartCounts[ch] *
        devices.find(device => device.id === ch)?.priceDiscount ||
      devices.find(device => device.id === ch)?.priceRegular ||
      0;
  }

  const deleteSelectedCart = (id: string) => {
    if (errorMessage) {
      return;
    }

    toggleAdded(id);

    setCartCounts(prev => {
      const updated = { ...prev };

      delete updated[id];

      return updated;
    });
  };

  const totalItems = Object.values(cartCounts).reduce(
    (prev, next) => prev + next,
    0,
  );

  return (
    <div className={styles.cartPage}>
      <div className={styles.navigation}>
        <button onClick={() => navigate(-1)}>
          <img src="./img/arrowLeft.svg" alt="arrowLeft" />
        </button>
        <p className={styles.text}>Back</p>
      </div>

      <div className={styles.phone}>
        <div className={styles.title}>
          <h1>Cart</h1>
        </div>
        {loader ? (
          <Loader />
        ) : errorMessage ? (
          <div className={styles.error}>{errorMessage}</div>
        ) : (
          <div className={styles.cartsPage}>
            <div className={styles.cartsList}>
              {devices.map(device => {
                return (
                  <div className={styles.cart} key={device.id}>
                    <img
                      src="img/close.svg"
                      alt="closeIcon"
                      className={styles.closeIcon}
                      onClick={() => {
                        deleteSelectedCart(device.id);
                      }}
                    />
                    <img
                      src={`${device.images[0]}`}
                      alt={`${device.images[0]}`}
                      className={styles.cartPhoto}
                    />
                    <p className={styles.devicesName}>{device.name}</p>
                    <div className={styles.devicesCount}>
                      <button
                        onClick={() => decreaseCount(device.id)}
                        disabled={(cartCounts[device.id] || 1) <= 1}
                        className={styles.devicesButton}
                      >
                        <img src="img/minus.svg" alt="minusPhoto" />
                      </button>

                      <p>{cartCounts[device.id] || 1}</p>
                      <button
                        className={styles.devicesButton}
                        onClick={() => increaseCount(device.id)}
                      >
                        <img src="img/plus.svg" alt="plusPhoto" />
                      </button>
                    </div>
                    <p className={styles.devicesPrice}>
                      ${device.priceDiscount}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className={styles.cartsBuy}>
              <div className={styles.cartsInfo}>
                <p className={styles.cartsPrice}>${sum}</p>
                <p className={styles.cartCounts}>
                  Total for {totalItems} items
                </p>
                <div className={styles.catalogButtons}>
                  <button className={styles.buttonsBuy}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
