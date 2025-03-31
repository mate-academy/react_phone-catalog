import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import styles from './ProductsSlider.module.scss';

export const ProductsSlider = () => {
  return (
    <section className={styles.productSlider}>
      <div className={styles.productSlider__container}>
        <h2 className={styles.productSlider__title}>Brand new models</h2>
        <div className={styles.productSlider__btn}>
          <button className={styles.productSlider__leftBtn} id="prevProduct">
            <img
              loading="lazy"
              className={styles.productSlider__leftBtnImage}
              src="src/assets/icons/slider-icons/left-arrow.svg"
              alt="Попередній продукт"
            />
          </button>
          <button className={styles.productSlider__rightBtn} id="nextProduct">
            <img
              loading="lazy"
              className={styles.productSlider__rightBtnImage}
              src="src/assets/icons/slider-icons/right-arrow.svg"
              alt="Наступний продукт"
            />
          </button>
        </div>

        <div className={styles.productSlider__products}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10} // Відстань між слайдами
            breakpoints={{
              320: {
                slidesPerView: 1.5, // При ширині екрану від 640px - 2 слайди
                spaceBetween: 16, // Відстань між слайдами
              },
              640: {
                slidesPerView: 2.5, // При ширині екрану від 640px - 2 слайди
                spaceBetween: 16, // Відстань між слайдами
              },
              1200: {
                slidesPerView: 4, // При ширині екрану від 1024px - 4 слайди
                spaceBetween: 16,
              },
            }}
            navigation={{
              prevEl: '#prevProduct',
              nextEl: '#nextProduct',
            }}
          >
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={styles.productSlider__product}>
                <img
                  loading="lazy"
                  className={styles.productSlider__mainImage}
                  src="src/assets/images/productsSlider/products-phone.png"
                  alt=""
                />
                <p className={styles.productSlider__description}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
                <p className={styles.productSlider__price}>$999</p>
                <span className={styles.productSlider__line}></span>
                <div className={styles.productSlider__featureWrapper}>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>Screen</p>
                    <p className={styles.productSlider__featureValue}>
                      6.1” OLED
                    </p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>
                      Capacity
                    </p>
                    <p className={styles.productSlider__featureValue}>128 GB</p>
                  </div>
                  <div className={styles.productSlider__feature}>
                    <p className={styles.productSlider__featureTitle}>RAM</p>
                    <p className={styles.productSlider__featureValue}>6 GB</p>
                  </div>
                </div>
                <div className={styles.productSlider__buttons}>
                  <button className={styles.productSlider__add}>
                    Add to cart
                  </button>
                  <button className={styles.productSlider__favorites}>
                    <img
                      loading="lazy"
                      src="src/assets/images/productsSlider/favorites-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
