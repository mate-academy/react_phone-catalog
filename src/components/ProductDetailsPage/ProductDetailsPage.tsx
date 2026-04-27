import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { NavigateBar } from '../NavigateBar';
import { CardCarousel } from '../CardCarousel';
import { useProducts } from '../../hooks/useProducts';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Products } from '../../types';
import { ProductsContext } from '../../context/ProductsContext';
import { NotProduct } from '../NotProduct';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';

export const ProductDetailsPage: React.FC = () => {
  const { products, phones, tablets, accessories } = useProducts();
  const { category, productId } = useParams();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { cart, favorites, toggleCart, toggleFavorite, isLoading } =
    useContext(ProductsContext);

  const specLabels: Record<string, string> = {
    screen: 'Screen',
    resolution: 'Resolution',
    processor: 'Processor',
    ram: 'RAM',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
  };

  const specKeys: (keyof Products)[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ];

  const normalizeColor = (color: string) =>
    color.toLowerCase().replace(/\s+/g, '-');

  const colorMap: Record<string, string> = {
    black: '#1F1F1F',
    blue: '#2F80ED',
    coral: '#FF7F50',
    gold: '#F2C9A1',
    graphite: '#4B4B4B',
    green: '#5F8F6B',
    midnight: '#191970',
    midnightgreen: '#355E5A',
    pink: '#FFC0CB',
    purple: '#9B6BCB',
    red: '#EB5757',
    'rose gold': '#E0BFB8',
    rosegold: '#E0BFB8',
    sierrablue: '#9DB7D6',
    silver: '#D6D6D6',
    'sky blue': '#87CEEB',
    'space gray': '#4F4F4F',
    'space-gray': '#4F4F4F',
    spaceblack: '#2D2D2D',
    spacegray: '#4F4F4F',
    starlight: '#F5E6C8',
    white: '#F5F5F5',
    yellow: '#F2C94C',
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const allProducts = useMemo(() => {
    return [...phones, ...tablets, ...accessories];
  }, [phones, tablets, accessories]);

  const selectProduct = allProducts.find(p => p.id === productId);

  useEffect(() => {
    if (selectProduct?.images?.length) {
      setActiveImage(selectProduct.images[0]);
    }
  }, [selectProduct]);

  if (isLoading) {
    return (
      <ContentLoader
        speed={2}
        width={300}
        height={506}
        viewBox="0 0 300 506"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className={styles.loadclass}
      >
        <rect x="7" y="19" rx="0" ry="0" width="56" height="53" />
        <rect x="146" y="271" rx="0" ry="0" width="91" height="7" />
        <rect x="146" y="281" rx="0" ry="0" width="91" height="7" />
        <rect x="10" y="225" rx="0" ry="0" width="97" height="31" />
        <rect x="10" y="271" rx="0" ry="0" width="91" height="26" />
        <rect x="11" y="302" rx="0" ry="0" width="91" height="26" />
        <rect x="12" y="333" rx="0" ry="0" width="91" height="26" />
        <rect x="7" y="77" rx="0" ry="0" width="56" height="53" />
        <rect x="7" y="134" rx="0" ry="0" width="56" height="53" />
        <rect x="76" y="20" rx="0" ry="0" width="180" height="171" />
        <rect x="144" y="225" rx="0" ry="0" width="97" height="31" />
      </ContentLoader>
    );
  }

  if (!selectProduct) {
    return <NotProduct />;
  }

  const isFavorite = favorites.some(item => item.id === selectProduct.id);
  const isInCart = cart.some(item => item.id === selectProduct.id);

  return (
    <section>
      <div className={styles.product}>
        <NavigateBar />
        <button className={styles.backbutton} onClick={() => navigate(-1)}>
          <img src="./img/icons/arrowLeft.svg" alt="Back" />
          {t('back')}
        </button>
        <h1 className={styles.title}>{selectProduct?.name}</h1>
        <div className={styles.boxfirst}>
          <div className={styles.imgbox}>
            {selectProduct?.images.map(im => (
              <div
                key={im}
                className={
                  activeImage === im
                    ? `${styles.imgstyle} ${styles.active}`
                    : styles.imgstyle
                }
                onClick={() => setActiveImage(im)}
              >
                <img src={`./${im}`} alt="ProductIM" className={styles.img} />
              </div>
            ))}
          </div>
          <div className={styles.mainImage}>
            {activeImage && (
              <img
                src={`./${activeImage}`}
                alt="Product"
                className={styles.imgmain}
              />
            )}
          </div>
          <div className={styles.detail}>
            <div className={styles.colors}>
              <p className={styles.textdetail}>{t('color')}</p>

              <div className={styles.colorList}>
                {selectProduct?.colorsAvailable.map(color => {
                  const newId = productId?.replace(
                    normalizeColor(selectProduct.color),
                    normalizeColor(color),
                  );

                  return (
                    <NavLink
                      key={color}
                      to={`/${category}/${newId}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.color} ${styles.activeColor}`
                          : styles.color
                      }
                    >
                      <span
                        className={styles.colorCircle}
                        style={{ backgroundColor: colorMap[color] }}
                      />
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className={styles.capacitys}>
              <p className={styles.textdetail}>{t('capacitys')}</p>
              <div className={styles.box}>
                {selectProduct?.capacityAvailable.map(cap => {
                  const newId = productId?.replace(
                    selectProduct.capacity.toLowerCase(),
                    cap.toLowerCase(),
                  );

                  return (
                    <NavLink
                      key={cap}
                      to={`/${category}/${newId}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.capacity} ${styles.activecapacity}`
                          : styles.capacity
                      }
                    >
                      {cap}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className={styles.charateritik}>
              <div className={styles.buyselector}>
                <div className={styles.prices}>
                  <p className={styles.price}>
                    ${selectProduct?.priceDiscount}
                  </p>
                  <p className={styles.fullprice}>
                    ${selectProduct?.priceRegular}
                  </p>
                </div>
                <div className={styles.actions}>
                  <button
                    className={
                      isInCart
                        ? `${styles.button} ${styles.activee}`
                        : styles.button
                    }
                    onClick={() => toggleCart(selectProduct.id)}
                  >
                    <p
                      className={
                        isInCart
                          ? `${styles.buttontext} ${styles.activee}`
                          : styles.buttontext
                      }
                    >
                      {!isInCart && t('button')}
                      {isInCart && t('buttonadd')}
                    </p>
                  </button>
                  <button
                    className={styles.icon}
                    onClick={() => toggleFavorite(selectProduct.id, false)}
                  >
                    {!isFavorite && (
                      <img src="./img/icons/heart.svg" alt="Heart" />
                    )}

                    {isFavorite && (
                      <img
                        src="./img/icons/heartactive.svg"
                        alt="HeartActive"
                      />
                    )}
                  </button>
                </div>
                <ul className={styles.specs}>
                  <li>
                    <span className={styles.lefttext}>{t('screen')}</span>
                    <span className={styles.righttext}>
                      {selectProduct?.screen}
                    </span>
                  </li>
                  <li>
                    <span className={styles.lefttext}>{t('capacity')}</span>
                    <span className={styles.righttext}>
                      {selectProduct?.resolution}
                    </span>
                  </li>
                  <li>
                    <span className={styles.lefttext}>{t('processor')}</span>
                    <span className={styles.righttext}>
                      {selectProduct?.processor}
                    </span>
                  </li>
                  <li>
                    <span className={styles.lefttext}>{t('ram')}</span>
                    <span className={styles.righttext}>
                      {selectProduct?.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.about}>
            <h2 className={styles.title2}>{t('about')}</h2>
            <div className={styles.introBlock}>
              <h3 className={styles.tytle3}>
                {selectProduct?.description[0].title}
              </h3>
              <p className={styles.text}>
                {selectProduct?.description[0].text}
              </p>
            </div>
            <div className={styles.introBlock}>
              <h3 className={styles.tytle3}>
                {selectProduct?.description[1].title}
              </h3>
              <p className={styles.text}>
                {selectProduct?.description[1].text}
              </p>
            </div>
            <div className={styles.introBlock}>
              <h3 className={styles.tytle3}>
                {selectProduct?.description[2].title}
              </h3>
              <p className={styles.text}>
                {selectProduct?.description[2].text}
              </p>
            </div>
          </div>
          <div className={styles.gost}></div>
          <ul className={styles.techspecs}>
            <h2 className={styles.title2}>{t('tech')}</h2>
            {selectProduct &&
              specKeys.map(key => {
                const value = selectProduct[key];

                if (!value) {
                  return null;
                }

                return (
                  <li key={key} className={styles.listyle}>
                    <span className={styles.text}>{specLabels[key]}</span>
                    <span className={styles.righttext}>
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className={styles.tech}></div>
      </div>
      <CardCarousel
        products={products}
        title={t('titlelike')}
        fullPrice={true}
      />
    </section>
  );
};
