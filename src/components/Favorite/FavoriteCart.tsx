import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/HeaderComponent';
import { CardComponent } from '../main/CardComponent/CardComponent';
import { TransitionComponent } from '../main/Transition/TransitionComponent';
import { useEffect, useState } from 'react';
import { Loader } from '../loader/Loader';
import { useDevices } from '../../context/DeviceProvider';

import styles from './favorite.module.scss';
import h1 from '../PDP/productsDetails.module.scss';
import span from '../PhonePage/phonePage.module.scss';
import classNames from 'classnames';

export const FavoriteCart = () => {
  const { favoriteDevices } = useDevices();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteDevices.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }

    return;
  }, [favoriteDevices]);

  return (
    <div className={styles.cart_page_container}>
      <Header />
      <div className={styles.cart_page}>
        <TransitionComponent filter={'Favorite'} />

        <div className={styles.cart_h1_contain}>
          <h1 className={classNames(h1.product_h1, styles.cart_h1)}>
            Favorites
          </h1>
          <span className={span.phone_head_span}>
            {favoriteDevices.length} items
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {favoriteDevices.length ? (
              <div className={styles.cart_container}>
                {favoriteDevices.map(devices => (
                  <CardComponent key={devices.id} devices={devices} />
                ))}
              </div>
            ) : (
              <div className={styles.cart_container}>
                <img
                  src="img/cart-is-empty.png"
                  alt="logo"
                  className={styles.cart_img}
                />
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
