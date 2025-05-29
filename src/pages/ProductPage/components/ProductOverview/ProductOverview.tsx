import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import { useLocalStorage } from '../../../../hooks/useLocaleStorage';
import { ProductDetails } from '../../../../types/ProductDetails';
import { Product } from '../../../../types/Product';

import { ButtonPrimary } from '../../../../components/UI/ButtonPrimary';
import { ButtonFavorite } from '../../../../components/UI/ButtonFavorite';
import { ProductTechSpec } from '../ProductTechSpec';
import { Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './ProductOverview.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
  productDetails: ProductDetails;
};

export const ProductOverview: React.FC<Props> = ({
  product,
  productDetails,
}) => {
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [storedCart, setStoredCart] = useLocalStorage<Product[]>('cart', []);
  const [storedFavorites, setStoredFavorites] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const galleryPhotoRef = useRef<SwiperType | null>(null);
  const galleryPreviewRef = useRef<SwiperType | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setInCart(state => !state);

    setStoredCart(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFavorite(state => !state);

    setStoredFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  const handleReplaceInPathname = (
    currentSegment: string,
    newSegment: string,
  ) => {
    const updatedPath = location.pathname.replace(
      currentSegment.toLocaleLowerCase(),
      newSegment.toLowerCase(),
    );

    navigate(updatedPath);
  };

  useEffect(() => {
    setIsFavorite(storedFavorites.some(p => p.id === product.id));
    setInCart(storedCart.some(p => p.id === product.id));
  }, [storedFavorites, storedCart, product, location.pathname]);

  useEffect(() => {
    if (galleryPhotoRef.current) {
      galleryPhotoRef.current.update();
      galleryPhotoRef.current.slideTo(0);
    }

    if (galleryPreviewRef.current) {
      galleryPreviewRef.current.slideTo(0);
    }
  }, [location.pathname]);

  return (
    <div className={styles.product__overview}>
      <div className={styles.overview__gallery}>
        <Swiper
          onSwiper={swiperInstance => {
            galleryPhotoRef.current = swiperInstance;
          }}
          modules={[Thumbs]}
          slidesPerView={1}
          centeredSlides={true}
          thumbs={{ swiper: thumbsSwiper }}
          className={styles['overview__gallery-photo']}
        >
          {productDetails.images.map(path => (
            <SwiperSlide
              key={path}
              className={styles['overview__gallery-photo-slide']}
            >
              <img src={`/${path}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={swiperInstance => {
            galleryPreviewRef.current = swiperInstance;
            setThumbsSwiper(swiperInstance);
          }}
          modules={[Thumbs]}
          slidesPerView="auto"
          allowTouchMove={false}
          freeMode={true}
          watchSlidesProgress
          className={styles['overview__gallery-preview']}
        >
          <div className={styles['overview__gallery-preview-wrapper']}>
            {productDetails.images.map(path => (
              <SwiperSlide
                className={styles['overview__gallery-preview-slide']}
                key={path}
              >
                <img src={`/${path}`} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <div className={styles['overview__purchase-panel']}>
        <div className={styles['purchase-panel__option']}>
          <div className={styles['purchase-panel__option-title-wrapper']}>
            <p className="main-text main-text--sm main-text--secondary">
              Avaliable colors
            </p>
            <p className="main-text main-text--sm main-text--secondary">
              ID: {product.id}
            </p>
          </div>
          <div className={styles['purchase-panel__option-colors-wrapper']}>
            {productDetails.colorsAvailable.map(color => (
              <button
                key={color}
                onClick={() =>
                  handleReplaceInPathname(productDetails.color, color)
                }
                className={classNames(
                  `button-box button-box--sm button-box--rounded ${styles['purchase-panel__option-color-btn']}`,
                  { 'button--active': productDetails.color === color },
                )}
                style={{ backgroundColor: `${color}` }}
              ></button>
            ))}
          </div>
          <div className={`divider ${styles['purchase-panel__divider']}`}></div>
        </div>
        <div className={styles['purchase-panel__option']}>
          <div className={styles['purchase-panel__option-title-wrapper']}>
            <p className="main-text main-text--sm main-text--secondary">
              Select capacity
            </p>
          </div>
          <div className={styles['purchase-panel__option-capacity-wrapper']}>
            {productDetails.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                onClick={() =>
                  handleReplaceInPathname(productDetails.capacity, capacity)
                }
                className={classNames(
                  `button-box button-box--sm ${styles['purchase-panel__option-capacity']}`,
                  {
                    'button--active': productDetails.capacity === capacity,
                  },
                )}
              >
                {capacity}
              </button>
            ))}
          </div>
          <div className={`divider ${styles['purchase-panel__divider']}`}></div>
        </div>
        <div>
          <div className={styles['purchase-panel__price-wrapper']}>
            <h2>
              {productDetails.priceDiscount ? (
                <>
                  ${productDetails.priceDiscount}{' '}
                  <span className="main-text--secondary price-discount">
                    ${productDetails.priceRegular}
                  </span>
                </>
              ) : (
                productDetails.priceRegular
              )}
            </h2>
          </div>
          <div className={styles['purchase-panel__btns']}>
            {inCart ? (
              <ButtonPrimary variant="selected" onClick={toggleCart}>
                Remove from cart
              </ButtonPrimary>
            ) : (
              <ButtonPrimary onClick={toggleCart}>Add to cart</ButtonPrimary>
            )}

            <ButtonFavorite selected={isFavorite} onClick={toggleFavorite} />
          </div>
        </div>
        <div className={styles['purchase-panel__specs-wrapper']}>
          <ProductTechSpec title="Screen" value={productDetails.screen} />
          <ProductTechSpec
            title="Resolution"
            value={productDetails.resolution}
          />
          <ProductTechSpec title="Processor" value={productDetails.processor} />
          <ProductTechSpec title="RAM" value={productDetails.ram} />
        </div>
      </div>
    </div>
  );
};
