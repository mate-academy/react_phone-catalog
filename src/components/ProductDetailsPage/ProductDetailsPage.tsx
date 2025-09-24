/* eslint-disable import/no-extraneous-dependencies */
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api';
import { ProductDetails } from '../../types/ProductsDetails';
import { CategoryType } from '../../types/Category';
import styles from './ProductDetails.module.scss';
import { Loader } from '../Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError('');

    getProductById(category as CategoryType)
      .then(products => {
        const productDetail = products.find(
          (item: ProductDetails) => item.id === productId,
        );

        setProduct(productDetail);
      })
      .catch(() => setIsError('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  const colorMap: Record<string, string> = {
    midnight: '#191970',
    graphite: '#383838',
    spacegray: '#4B4B4B',
    midnightgreen: '#004953',
    rosegold: '#B76E79',
    spaceblack: '#161617',
    sierrablue: '#7393B3',
    'space gray': '#4B4B4B',
    'rose gold': '#B76E79',
    'sky blue': '#87CEEB',
  };

  return (
    <section className={styles['product-details']}>
      <div className="container">
        <Breadcrumbs category={category} product={product} />
        <Link
          to={`/${category}`}
          className={styles['product-details__back-btn']}
        >
          Back
        </Link>
        {isLoading && <Loader />}
        {!isLoading && isError && (
          <div className={styles['product-details__img-box']}>
            <img
              className={styles['product-details__img']}
              src="/img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        )}
        {!isLoading && !isError && !product && (
          <div className={styles['product-details__img-box']}>
            <img
              className={styles['product-details__img']}
              src="/img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        )}
        {!isLoading && !isError && product && (
          <div className={styles['product-details__content']}>
            <h2 className="title">{product.name}</h2>
            <div className={styles['product-details__box']}>
              <div className={styles['product-details__slider-wrapper']}>
                <Swiper
                  slidesPerView={1}
                  modules={[Pagination]}
                  direction={'vertical'}
                  pagination={{
                    clickable: true,
                    el: '#product-details-slider-pagination',
                    renderBullet: (index, className) => {
                      return `
        <span class="${className}">
          <img src="/${product.images[index]}" alt="thumb" />
        </span>
      `;
                    },
                  }}
                >
                  <SwiperSlide>
                    <img
                      className={styles['product-details__slider-img']}
                      src={`/${product.images[0]}`}
                      alt="Photo of product"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={styles['product-details__slider-img']}
                      src={`/${product.images[1]}`}
                      alt="Photo of product"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={styles['product-details__slider-img']}
                      src={`/${product.images[2]}`}
                      alt="Photo of product"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={styles['product-details__slider-img']}
                      src={`/${product.images[3]}`}
                      alt="Photo of product"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={styles['product-details__slider-img']}
                      src={`/${product.images[4]}`}
                      alt="Photo of product"
                    />
                  </SwiperSlide>
                </Swiper>
                <div
                  id="product-details-slider-pagination"
                  className={`swiper-pagination ${styles['product-details__pagination']}`}
                ></div>
              </div>
              <div className={styles['product-details__characteristics']}>
                <div className={styles['product-details__characteristics-box']}>
                  <div
                    className={styles['product-details__characteristics-title']}
                  >
                    Available colors
                  </div>
                  <div
                    className={styles['product-details__characteristics-color']}
                  >
                    {product.colorsAvailable.map((color, index) => (
                      <a
                        // ${styles['product-details__characteristics-color-link--active']}
                        className={`${styles['product-details__characteristics-color-link']}`}
                        href="#"
                        key={index}
                        style={{ backgroundColor: colorMap[color] || color }}
                      ></a>
                    ))}
                  </div>
                </div>
                <div
                  className={styles['product-details__characteristics-divider']}
                ></div>
                <div className={styles['product-details__characteristics-box']}>
                  <div
                    className={styles['product-details__characteristics-title']}
                  >
                    Select capacity
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-capacity']
                    }
                  >
                    {product.capacityAvailable.map((capacity, index) => {
                      const numberCapacity = capacity.match(/\d+/);
                      const stringCapacity = capacity.replace(/\d+/, '');

                      return (
                        <a
                          className={
                            styles[
                              'product-details__characteristics-capacity-link'
                            ]
                          }
                          href="#"
                          key={index}
                        >
                          {`${numberCapacity} ${stringCapacity}`}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={styles['product-details__characteristics-divider']}
                ></div>
                <div
                  className={styles['product-details__characteristics-price']}
                >
                  <div
                    className={
                      styles['product-details__characteristics-new-price']
                    }
                  >
                    ${product.priceDiscount}
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-old-price']
                    }
                  >
                    ${product.priceRegular}
                  </div>
                </div>
                <div
                  className={
                    styles['product-details__characteristics-link-box']
                  }
                >
                  <a
                    className={styles['product-details__characteristics-link']}
                    href="#"
                  >
                    Add to cart
                  </a>
                  <a
                    className={
                      styles['product-details__characteristics-link-favourite']
                    }
                    href="#"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M9.62852 1.63137C10.1584 1.41179 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.41179 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98393 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66666C15.6679 6.24027 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.825 0.33252 5.66666C0.33252 4.50832 0.792668 3.39743 1.61174 2.57836C2.43081 1.75928 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75928 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57843 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07391 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07391 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.5683C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.5683C2.04517 4.12482 1.73252 4.87963 1.73252 5.66666C1.73252 6.4537 2.04517 7.2085 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48952 13.8928 7.1623 14.042 6.80228C14.1911 6.44225 14.2679 6.05637 14.2679 5.66666C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17102 13.6739 3.84369 13.3983 3.56819Z"
                        fill="#F1F2F9"
                      />
                    </svg>
                  </a>
                </div>
                <div
                  className={styles['product-details__characteristics-descr']}
                >
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Screen
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.screen}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Resolution
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.resolution}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Processor
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.processor}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      RAM
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.ram}
                    </div>
                  </div>
                </div>
              </div>
              <p className={styles['product-details__identifier']}>
                ID: {product.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
