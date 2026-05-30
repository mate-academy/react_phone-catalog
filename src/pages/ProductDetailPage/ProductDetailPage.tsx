import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './ProductDetailPage.module.scss';
import { ProductDetails } from '../../types';
import { ProductSlider } from '../../components/ProductSlider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { VectorBreadCrumbs } from '../../components/VectorBreadCrumbs';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export const ProductDetailPage: React.FC = () => {
  const { product, productId } = useParams();
  const location = useLocation();

  const [productDetail, setProductDetail] = useState<ProductDetails | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNewIdColor = (color: string) => {
    if (!productDetail?.id) {
      return productId || '';
    }

    const parts = productDetail.id.split('-');
    const sizeIndex = parts.findIndex(
      p => p.endsWith('mm') || p.endsWith('gb') || p.endsWith('tb'),
    );

    if (sizeIndex === -1) {
      return productId || '';
    }

    const formattedColor = color.trim().replace(/\s+/g, '-');

    const baseParts = parts.slice(0, sizeIndex + 1);

    baseParts.push(formattedColor);

    return baseParts.join('-');
  };

  const getNewIdCapacity = (capacity: string) => {
    if (!productDetail?.id) {
      return productId || '';
    }

    const parts = productDetail.id.split('-');
    const sizeIndex = parts.findIndex(
      p => p.endsWith('mm') || p.endsWith('gb') || p.endsWith('tb'),
    );

    if (sizeIndex === -1) {
      return productId || '';
    }

    parts[sizeIndex] = capacity.toLowerCase();

    return parts.join('-');
  };

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://roman-logos-frontend.github.io/react_phone-catalog/api/${product}.json`,
        );
        const data = await response.json();

        const productDetailId = data.find(
          (item: ProductDetails) => item.id === productId,
        );

        if (productDetailId) {
          setProductDetail(productDetailId);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product, productId]);

  const normalize = (value: string) =>
    value.toLowerCase().replace(/\s+/g, '').replace(/-+/g, '');

  useEffect(() => {
    if (!productDetail) {
      return;
    }

    const pathParts = location.pathname.split('-');
    const colorFromUrl = pathParts[pathParts.length - 1];
    const capacityFromUrl = pathParts[pathParts.length - 2];

    setSelectedImage(productDetail.images[0]);

    const normalizedColors = productDetail.colorsAvailable.map(c =>
      normalize(c),
    );
    const normalizedColorFromUrl = normalize(colorFromUrl);

    const matchingColorIndex = normalizedColors.findIndex(
      c => c === normalizedColorFromUrl,
    );

    if (matchingColorIndex !== -1) {
      setSelectedColor(productDetail.colorsAvailable[matchingColorIndex]);
    }

    const normalizedCapacityFromUrl = normalize(capacityFromUrl || '');

    if (
      normalizedCapacityFromUrl &&
      productDetail.capacityAvailable
        .map(c => normalize(c))
        .includes(normalizedCapacityFromUrl)
    ) {
      setSelectedCapacity(normalizedCapacityFromUrl);
    }

    setSelectedImage(productDetail.images[0]);
  }, [productDetail, location.pathname]);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const newImage = productDetail?.images[activeIndex] || '';

    setSelectedImage(newImage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetail) {
    return <div>Product not found</div>;
  }

  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    gray: '#808080',
    spacegray: '#4A4A4A',
    starlight: '#E5C29F',
    midnight: '#222C39',
    purple: '#800080',
    yellow: '#FFFF00',
    graphite: '#4B4F54',
    gold: '#FFD700',
    sierrablue: '#A1B6D6',
    rosegold: '#B76E79',
    silver: '#C0C0C0',
    pink: '#FFC0CB',
    skyblue: '#87CEEB',
    spaceblack: '#101820',
    midnightgreen: '#004953',
  };

  return (
    <div className={styles.container}>
      <BreadCrumbs name={productDetail.name}></BreadCrumbs>
      <VectorBreadCrumbs></VectorBreadCrumbs>
      <h2 className={styles.title}>{productDetail.name}</h2>
      <div className={styles.section}>
        <Swiper
          effect="flip"
          grabCursor={true}
          className={styles.container__images}
          onSlideChange={handleSlideChange}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
        >
          {productDetail.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={productDetail.name}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.selectImage}>
          {productDetail.images.map((image, index) => (
            <div
              className={`${styles.imageDiv} ${selectedImage === image ? styles.selectedImage : ''}`}
              key={image}
            >
              <img
                onClick={() => {
                  setSelectedImage(image);
                  swiperRef.current?.slideTo(index);
                }}
                className={styles.image}
                src={image}
              />
            </div>
          ))}
        </div>

        <div className={styles.container__specs}>
          <div className={styles.container__specs__top}>
            <div className={styles.selectOptions}>
              <span className="smallText">Available colors</span>
              <div className={styles.select}>
                {productDetail.colorsAvailable.map(color => (
                  <NavLink
                    className={`${styles.colorDiv} ${
                      normalize(selectedColor) === normalize(color)
                        ? styles.selectedColor
                        : ''
                    }`}
                    key={color}
                    style={{
                      backgroundColor: colorMap[normalize(color)],
                    }}
                    to={`/${product}/${getNewIdColor(color)}`}
                    onClick={() => {
                      setSelectedImage(productDetail?.images[0] || '');
                      swiperRef.current?.slideTo(0);
                      setSelectedColor(color);
                    }}
                  />
                ))}
              </div>
            </div>

            <hr />

            <div className={styles.selectOptions}>
              <span className="smallText">Select capacity</span>
              <div className={styles.select}>
                {productDetail.capacityAvailable.map(capacity => (
                  <NavLink
                    className={`${styles.capacityDiv} ${selectedCapacity === capacity.toLowerCase() ? styles.selectedCapacity : ''} bodyText`}
                    key={capacity}
                    to={`/${product}/${getNewIdCapacity(capacity)}`}
                    onClick={() => {
                      setSelectedImage(productDetail?.images[0] || '');
                      swiperRef.current?.slideTo(0);
                      setSelectedCapacity(capacity);
                    }}
                  >
                    {capacity}
                  </NavLink>
                ))}
              </div>
            </div>

            <hr />
          </div>

          <div className={styles.price}>
            <h2>
              ${productDetail.priceDiscount}
              <span className={styles.regularPrice}>
                ${productDetail.priceRegular}
              </span>
            </h2>

            <button className={styles.add}>Add to cart</button>
          </div>

          <div className={styles.productDescription__bottom}>
            <div className={styles.specs}>
              <p>Screen</p>
              <p>{productDetail.screen}</p>
            </div>
            <div className={styles.specs}>
              <p>Resolution</p>
              <p>{productDetail.resolution}</p>
            </div>
            <div className={styles.specs}>
              <p>Processor</p>
              <p>{productDetail.processor}</p>
            </div>
            <div className={styles.specs}>
              <p>RAM</p>
              <p>{productDetail.ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productDescription}>
        <div className={styles.productDescription__top}>
          <h3>About</h3>
          <hr />
        </div>
        {productDetail.description.map((desc, index) => (
          <div key={index} className={styles.desc}>
            <h4>{desc.title}</h4>
            <div className={styles.desc__description}>
              {desc.text.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.productDescription}>
        <div className={styles.productDescription__top}>
          <h3>Tech specs</h3>
          <hr />
        </div>
        <div className={styles.productDescription__bottom}>
          <div className={styles.specs}>
            <p>Screen</p>
            <p>{productDetail.screen}</p>
          </div>
          <div className={styles.specs}>
            <p>Resolution</p>
            <p>{productDetail.resolution}</p>
          </div>
          <div className={styles.specs}>
            <p>Processor</p>
            <p>{productDetail.processor}</p>
          </div>
          <div className={styles.specs}>
            <p>RAM</p>
            <p>{productDetail.ram}</p>
          </div>
          {productDetail.camera && (
            <div className={styles.specs}>
              <p>Camera</p>
              <p>{productDetail.camera}</p>
            </div>
          )}
          {productDetail.camera && (
            <div className={styles.specs}>
              <p>Zoom</p>
              <p>{productDetail.zoom}</p>
            </div>
          )}
          <div className={styles.specs}>
            <p>Cell</p>
            <p>{productDetail.cell.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className={styles.slider}>
        <ProductSlider sliderTitle={'You may also like'} filteredItems={[]} />
      </div>
    </div>
  );
};
