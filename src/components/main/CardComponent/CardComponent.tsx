import { NavLink } from 'react-router-dom';
import { Accessories, Product, ProductChars } from '../../../types';
import styles from './card.module.scss';
import classNames from 'classnames';
import { FavoriteProps, useFavorites } from '../../../context/FavoriteProvider';
import { useEffect, useState } from 'react';
import { useShoping } from '../../../context/ShopingProvider';

interface CardComponentProps {
  devices: Product | ProductChars | Accessories;
  salePrice?: number;
}

export const CardComponent = ({ devices, salePrice }: CardComponentProps) => {
  const itemId = 'itemId' in devices ? devices.itemId : devices.id;
  const category = 'category' in devices ? devices.category : '';
  const { addToFavorites } = useFavorites();
  const { addToCart } = useShoping();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleFavButton = (device: FavoriteProps) => {
    const deviceId = device.id;

    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [deviceId]: !prevFavorites[deviceId],
    }));

    localStorage.setItem(
      `isFav_${deviceId}`,
      JSON.stringify(!favorites[deviceId]),
    );

    addToFavorites(device);
  };

  useEffect(() => {
    const allFavorites: Record<string, boolean> = {};

    if (Array.isArray(devices)) {
      devices.forEach((device: FavoriteProps) => {
        const saved = localStorage.getItem(`isFav_${device.id}`);

        if (saved) {
          allFavorites[device.id] = JSON.parse(saved);
        }
      });
      setFavorites(allFavorites);
    }
  }, [devices]);

  return (
    <>
      <div className={classNames(styles.card)} key={devices.id}>
        <div className={styles.card_flex_column}>
          <NavLink to={`/${category}/${itemId}`}>
            {'images' in devices && devices.images.length > 0 ? (
              <img
                src={`${devices.images[0]}`}
                alt="img"
                className={styles.card_images}
              />
            ) : (
              'image' in devices && (
                <img
                  src={`${devices.image}`}
                  alt="img"
                  className={styles.card_images}
                />
              )
            )}
          </NavLink>
          <div>{'name' in devices && <span>{devices.name}</span>}</div>
          <div className={styles.card_price_container}>
            <h2 className={styles.card_price}>
              {'price' in devices
                ? `$${devices.price}`
                : 'priceRegular' in devices
                  ? `$${devices.priceRegular}`
                  : 'Price not available'}
            </h2>

            {salePrice ? (
              <h2 className={styles.card_price_sale}>{`$${salePrice}`}</h2>
            ) : 'priceRegular' in devices ? (
              <h2
                className={styles.card_price_sale}
              >{`$${devices.priceDiscount}`}</h2>
            ) : null}
          </div>

          <div className={styles.card_stats}>
            {'screen' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>screen</span>
                <span className={styles.card_stats_right}>
                  {devices.screen}
                </span>
              </div>
            )}
            {'capacity' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>capacity</span>
                <span className={styles.card_stats_right}>
                  {devices.capacity}
                </span>
              </div>
            )}
            {'ram' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>ram</span>
                <span className={styles.card_stats_right}>{devices.ram}</span>
              </div>
            )}
          </div>
          <div className={styles.card_buy_container}>
            <button
              className={styles.card_buy_button}
              onClick={() => addToCart(devices)}
            >
              Add to card
            </button>
            <button
              className={classNames(styles.card_follow_button)}
              onClick={() => handleFavButton(devices)}
            >
              <img
                className={classNames({
                  [styles.card_follow_button_un]: !favorites[devices.id],
                  [styles.card_follow_button_ac]: favorites[devices.id],
                })}
                src="./img/Vector(Heart).svg"
                alt="heart"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
