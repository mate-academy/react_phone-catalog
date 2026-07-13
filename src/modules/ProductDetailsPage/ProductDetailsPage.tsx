import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAccessories,
  usePhones,
  useProducts,
  useTablets,
} from '../../hooks/useProducts';

import styles from './ProductDetailsPage.module.scss';
import classNames from 'classnames';
import { getSuggestedProducts } from '../../hooks/getSuggestedProducts';
import { ProductsSlider } from '../shared/ProductsSlider';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouriteContext';
import { Loader } from '../shared/Loader/Loader';
import { useTranslation } from 'react-i18next';

export const ProductDetailsPage: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

  const { addToCart, items } = useCart();
  const { addToFavourites, favouriteItems, removeFromFavourites } =
    useFavourites();
  const { t } = useTranslation();

  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const allBaseProducts = useProducts();

  const phones = usePhones();
  const tablets = useTablets();
  const accessories = useAccessories();

  const allDetailedProducts = [...phones, ...tablets, ...accessories];

  const product: Product | undefined = allDetailedProducts.find(
    item => item.id === productId,
  );

  const suggestedProducts = useMemo(() => {
    const filtered = allBaseProducts.filter(item => item.itemId !== productId);

    return getSuggestedProducts(filtered, 8);
  }, [allBaseProducts, productId]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '150px 0',
        }}
      >
        <h2>{t('Product was not found')}</h2>
      </div>
    );
  }

  const getHexColor = (colorName: string): string => {
    const colors: Record<string, string> = {
      midnight: '#191970',
      black: '#1f2022',
      white: '#f7f7f8',
      roseGold: '#fad5cd',
      gold: '#f9e5c9',
      silver: '#e2e4e1',
      spacegray: '#555559',
      midnightgreen: '#4e5851',
      coral: '#ff6f5b',
      yellow: '#ffe681',
      red: '#ba0c2f',
      purple: '#d1c4e9',
      green: '#adebb3',
    };

    return colors[colorName] || colorName;
  };

  const handleAddToCart = (gadgetId: string) => {
    const readyProduct = allDetailedProducts.find(
      gadget => gadget.id === gadgetId,
    );

    if (!readyProduct) {
      return;
    }

    addToCart(readyProduct);
  };

  const handleAddToFavorites = (gadgetId: string) => {
    const readyProduct = allDetailedProducts.find(
      gadget => gadget.id === gadgetId,
    );

    if (!readyProduct) {
      return;
    }

    addToFavourites(readyProduct);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        setImageIndex(prev => (prev + 1) % product.images.length);
      } else {
        setImageIndex(
          prev => (prev - 1 + product.images.length) % product.images.length,
        );
      }
    }
  };

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.history}>
        <Link className={styles.iconLink} to="/">
          <img src="img/icons/icon_home.svg" alt="" />
        </Link>
        <img
          className={styles.arrowIcon}
          src="img/icons/history_arrow_right.svg"
          alt=""
        />
        <Link to={`/${product.category}`} className={styles.navCategory}>
          {t(`${product.category}`)}
        </Link>
        <img
          className={styles.arrowIcon}
          src="img/icons/history_arrow_right.svg"
          alt=""
        />
        <p className={styles.historyText}>{product.name}</p>
      </div>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <img src="img/icons/arrow_left.svg" alt="back" />
        <p className={styles.backText}>{t('Back')}</p>
      </button>
      <div className={styles.title}>{product.name}</div>

      <div className={styles.detailsCard}>
        <div className={styles.images}>
          <div className={styles.allImages}>
            {product.images.map((image, index) => (
              <div
                key={image}
                className={classNames(
                  `${styles.boxImage}`,
                  index === imageIndex && `${styles.boxActive}`,
                )}
                onClick={() => setImageIndex(index)}
              >
                <img src={image} alt="image" />
              </div>
            ))}
          </div>
          <div
            className={styles.basicImage}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.imageGalleryTrack}
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {product.images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className={styles.galleryImageItem}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.buyMenu}>
          <div className={styles.avaibleColors}>
            <p>{t('AvaibleColors')}</p>
            <div className={styles.colorsContainer}>
              {product.colorsAvailable.map(color => {
                const isActive = color === product.color;
                const partLink = `/product/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

                return (
                  <Link
                    to={partLink}
                    className={classNames(styles.colorCircle, {
                      [styles.activeColor]: isActive,
                    })}
                    key={color}
                    replace
                  >
                    <span
                      className={styles.colorInner}
                      style={{ backgroundColor: getHexColor(color) }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.capacityAvailable}>
            <p>{t('SelectCapacity')}</p>
            <div className={styles.capacityContainer}>
              {product.capacityAvailable.map(capacity => {
                const isActive = capacity === product.capacity;
                const partLink = `/product/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

                return (
                  <Link to={partLink} key={capacity} replace>
                    <button
                      className={classNames(styles.capacityButton, {
                        [styles.capacityButtonActive]: isActive,
                      })}
                    >
                      {capacity}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.addMenu}>
            <div className={styles.buySector}>
              <div className={styles.priceSector}>
                <h3 className={styles.price}>${product.priceRegular}</h3>
                <h3 className={styles.fullPrice}>${product.priceDiscount}</h3>
              </div>
              <div className={styles.buttons}>
                <button
                  className={classNames(
                    styles.buttonAdd,
                    items.some(item => product.id === item.id) &&
                      styles.activeAdd,
                  )}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                >
                  {items.some(item => product.id === item.id)
                    ? t('Added')
                    : t('Add')}
                </button>
                {favouriteItems.some(item => productId === item.id) ? (
                  <button
                    className={classNames(
                      styles.buttonFavorite,
                      styles.buttonFavoriteActive,
                    )}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromFavourites(product.id);
                    }}
                  >
                    <img
                      className={styles.favoriteImage}
                      src="img/icons/icon_favorite_active.svg"
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    className={styles.buttonFavorite}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToFavorites(product.id);
                    }}
                  >
                    <img
                      className={styles.favoriteImage}
                      src="img/icons/icon_favorite.svg"
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.characteristics}>
              <div className={styles.textSection}>
                <p className={styles.smallText}>{t('Screen')}</p>
                <p className={styles.bodyText}>{product.screen}</p>
              </div>
              <div className={styles.textSection}>
                <p className={styles.smallText}>{t('Resolution')}</p>
                <p className={styles.bodyText}>{product.resolution}</p>
              </div>
              <div className={styles.textSection}>
                <p className={styles.smallText}>{t('Processor')}</p>
                <p className={styles.bodyText}>{product.processor}</p>
              </div>
              <div className={styles.textSection}>
                <p className={styles.smallText}>{t('RAM')}</p>
                <p className={styles.bodyText}>{product.ram}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.about}>
          <h3 className={styles.descriptionTitle}>{t('About')}</h3>
          {product.description.map(desc => (
            <div className={styles.descriptionText} key={t(`${desc.title}`)}>
              <h4 className={styles.descriptionTextTitle}>
                {t(`${desc.title}`)}
              </h4>
              <p className={styles.descriptionBodyText}>{t(`${desc.text}`)}</p>
            </div>
          ))}
        </div>
        <div className={styles.techSpecs}>
          <h3 className={styles.descriptionTitle}>{t('TechSpecs')}</h3>
          <div className={styles.characteristics}>
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('Screen')}</p>
              <p className={styles.techSpecsRightText}>{product.screen}</p>
            </div>
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('Resolution')}</p>
              <p className={styles.techSpecsRightText}>{product.resolution}</p>
            </div>
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('Processor')}</p>
              <p className={styles.techSpecsRightText}>{product.processor}</p>
            </div>
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('RAM')}</p>
              <p className={styles.techSpecsRightText}>{product.ram}</p>
            </div>
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('Built')}</p>
              <p className={styles.techSpecsRightText}>{product.capacity}</p>
            </div>
            {product.category !== 'accessories' && (
              <>
                <div className={styles.textSection}>
                  <p className={styles.techSpecsLeftText}>{t('Camera')}</p>
                  <p className={styles.techSpecsRightText}>{product.camera}</p>
                </div>
                <div className={styles.textSection}>
                  <p className={styles.techSpecsLeftText}>{t('Zoom')}</p>
                  <p className={styles.techSpecsRightText}>{product.zoom}</p>
                </div>
              </>
            )}
            <div className={styles.textSection}>
              <p className={styles.techSpecsLeftText}>{t('Cell')}</p>
              <p className={styles.techSpecsRightText}>
                {product.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggestedSection}>
        <div className={styles.suggestedList}>
          <ProductsSlider
            title={t('You may also like')}
            products={suggestedProducts}
          />
        </div>
      </div>
    </div>
  );
};
