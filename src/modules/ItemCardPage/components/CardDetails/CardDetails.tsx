import styles from './CardDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../api/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BtnBack from '../../../../components/BtnBack/BtnBack';
import classNames from 'classnames';
import {
  addDevice,
  Device,
} from '../../../../features/favourites/favouritesSlice';
import { ProductType } from '../../../../types/Product';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { addToCart } from '../../../../features/cart/cartSlice';
import { useTranslation } from 'react-i18next';

const CardDetails = () => {
  const products = useAppSelector(state => state.products.listOfproducts);
  const favourites = useAppSelector(state => state.favourites.listOfDevices);
  const cart = useAppSelector(state => state.cart.cartList);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [imgIndex, setImgIndex] = useState(0);
  const locationStr = pathname.split('-');

  const activeColor = locationStr[locationStr.length - 1];

  const activeCapac = locationStr[locationStr.length - 2];
  // добавити тернарний опереатор якщо не найдено ТО СТОРІНКУ НОТ ФАУНД

  const device = useAppSelector(state => state.device.currentDevice);
  const isInCart = cart.some(item => item.itemId === device?.id);

  const changeColor = (color: string) => {
    // setActiveColor(color);
    const str = pathname.split('-');

    str[str.length - 1] = color;
    const newPathname = str.join('-');

    setImgIndex(0);
    navigate(newPathname);
  };

  const changeCapacity = (cap: string) => {
    // setActiveCapac(cap);
    const str = pathname.split('-');

    str[str.length - 2] = cap.toLowerCase();
    const newPathname = str.join('-');

    setImgIndex(0);
    navigate(newPathname);
  };

  const handleFavourite = (gadget: Device) => {
    const deviceForAdd = products.find(
      el => el.itemId === gadget.id,
    ) as ProductType;

    dispatch(addDevice(deviceForAdd));
  };

  const handleAddToCart = (gadget: Device) => {
    const deviceForAdd = products.find(
      el => el.itemId === gadget.id,
    ) as ProductType;

    dispatch(addToCart(deviceForAdd));
  };

  return (
    <>
      <section className={styles.section}>
        <BreadCrumbs />
        <BtnBack />
        {device && (
          <>
            <h2 className={styles.title}>{device.name}</h2>
            <div className={styles.deviceContent}>
              <div className={styles.photos}>
                <div className={styles.photosSmall}>
                  {device.images.map((imag, i) => (
                    <img
                      src={imag}
                      key={imag}
                      alt="imgdevice"
                      className={classNames(`${styles.photoSmall}`, {
                        [styles.photoSmallActive]: i === imgIndex,
                      })}
                      onClick={() => setImgIndex(i)}
                    />
                  ))}
                </div>
                <div className={styles.photosBig}>
                  <img
                    src={device.images[imgIndex]}
                    alt=""
                    className={styles.photoBig}
                  />
                </div>
              </div>
              <div className={styles.details}>
                <p>{t('availCols')}</p>
                <div className={styles.colors}>
                  {device.colorsAvailable.map(el => (
                    <div
                      className={classNames(`${styles.border}`, {
                        [styles.borderActive]: el === activeColor,
                      })}
                      key={el}
                      onClick={() => changeColor(el)}
                    >
                      <div
                        className={styles.color}
                        style={{
                          backgroundColor:
                            el === 'midnight'
                              ? '#0f0e47'
                              : el === 'spacegray'
                                ? 'gray'
                                : el === 'midnightgreen'
                                  ? 'lightgreen'
                                  : el === 'rosegold'
                                    ? 'pink'
                                    : el === 'sierrablue'
                                      ? 'lightblue'
                                      : el === 'graphite'
                                        ? '#41424C'
                                        : el === 'spaceblack'
                                          ? 'gray'
                                          : el,
                        }}
                      ></div>
                    </div>
                    // </Link>
                  ))}
                </div>

                <p>{t('selCapac')}</p>
                <div className={styles.capacities}>
                  {device.capacityAvailable.map(capac => (
                    <div
                      className={classNames(`${styles.capacity}`, {
                        [styles.capacityActive]:
                          capac.toLowerCase() === activeCapac.toLowerCase(),
                      })}
                      key={capac}
                      onClick={() => changeCapacity(capac)}
                    >
                      {capac}
                    </div>
                  ))}
                </div>

                <div className={styles.prices}>
                  <span className={styles.price}>${device.priceDiscount}</span>
                  <span className={styles.oldPrice}>
                    ${device.priceRegular}
                  </span>
                </div>

                <div className={styles.buttons}>
                  <button
                    className={classNames(styles.btnCart, {
                      [styles.btnCartActive]: isInCart,
                    })}
                    onClick={() => handleAddToCart(device)}
                  >
                    {isInCart ? t('addedCart') : t('addCart')}
                  </button>
                  <button
                    className={styles.btnFavour}
                    onClick={() => handleFavourite(device)}
                  >
                    {favourites.find(el => el.name === device.name) ? (
                      <svg
                        className={styles.iconFav}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#eb5757"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          // eslint-disable-next-line max-len
                          d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z"
                          fill="#eb5757"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className={styles.iconFav}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          // fill="#eb5757"
                          // eslint-disable-next-line max-len
                          d="M9.62852 0.631417C10.1584 0.411843 10.7264 0.298828 11.3 0.298828 C11.8737 0.298828 12.4416 0.411843 12.9716 0.631417C13.5015 0.850991 13.983 1.17282 14.3885 1.57852C14.7941 1.98398 15.1158 2.46537 15.3353 2.99519C15.5549 3.52511 15.6679 4.0931 15.6679 4.66671C15.6679 5.24032 15.5549 5.80831 15.3353 6.33824C15.1158 6.86811 14.794 7.34953 14.3884 7.75502C14.3883 7.75506 14.3884 7.75498 14.3884 7.75502L8.49502 13.6484 C8.22165 13.9217 7.77844 13.9217 7.50507 13.6484L1.61174 7.75502C0.792668 6.93595 0.33252 5.82505 0.33252 4.66671C0.33252 3.50837 0.792668 2.39747 1.61174 1.5784C2.43081 0.759334 3.54171 0.299185 4.70005 0.299185 C5.85839 0.299185 6.96928 0.759334 7.78835 1.5784L8.00005 1.7901L8.21162 1.57852C8.21158 1.57856 8.21166 1.57848 8.21162 1.57852C8.61711 1.17288 9.09865 0.85097 9.62852 0.631417ZM13.3983 2.56824C13.1228 2.29261 12.7957 2.07396 12.4357 1.92479C12.0756 1.77561 11.6898 1.69883 11.3 1.69883 C10.9103 1.69883 10.5245 1.77561 10.1644 1.92479C9.80441 2.07396 9.4773 2.29261 9.2018 2.56824L8.49502 3.27502C8.22165 3.54839 7.77844 3.54839 7.50507 3.27502L6.7984 2.56835C6.24189 2.01183 5.48708 1.69918 4.70005 1.69918C3.91301 1.69918 3.15821 2.01183 2.60169 2.56835C2.04517 3.12487 1.73252 3.87967 1.73252 4.66671C1.73252 5.45375 2.04517 6.20855 2.60169 6.76507L8.00005 12.1634L13.3984 6.76507C13.674 6.48957 13.8928 6.16235 14.042 5.80233C14.1911 5.4423 14.2679 5.05642 14.2679 4.66671C14.2679 4.27701 14.1911 3.89112 14.042 3.5311C13.8928 3.17107 13.6739 2.84374 13.3983 2.56824Z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>

                <div className={styles.charachters}>
                  <div className={styles.charachter}>
                    <span className={styles.key}>{t('screen')}</span>
                    <span className={styles.value}>{device.screen}</span>
                  </div>
                  <div className={styles.charachter}>
                    <span className={styles.key}>{t('resolution')}</span>
                    <span className={styles.value}>{device.resolution}</span>
                  </div>
                  <div className={styles.charachter}>
                    <span className={styles.key}>{t('proccessor')}</span>
                    <span className={styles.value}>{device.processor}</span>
                  </div>
                  <div className={styles.charachter}>
                    <span className={styles.key}>{t('ram')}</span>
                    <span className={styles.value}>{device.ram}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CardDetails;
