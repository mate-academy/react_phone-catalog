import { useNavigate } from 'react-router-dom';
import styles from './CartItems.module.scss';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useEffect, useMemo, useState } from 'react';
import { Products } from '../../types/Products';
import { getAllDetailedProducts } from '../../utils/api';
import { Loader } from '../Loader';

export const CartItems = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    getAllDetailedProducts()
      .then(setProducts)
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

  const { addedDevice } = useFavourites();

  const devices = useMemo(() => {
    return products?.filter(product => addedDevice.includes(product.id)) ?? [];
  }, [products, addedDevice]);

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
                      <button onClick={() => increaseCount(device.id)}>
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
                <p className={styles.cartsPrice}>$2657</p>
                <p className={styles.cartCounts}>Total for 3 items</p>
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
