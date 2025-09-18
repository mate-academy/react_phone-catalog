import { Swiper, SwiperSlide } from 'swiper/react';
import { HotPriceInterface } from '../../interfaces/HotPriceInterface';
import styles from './HotPrices.module.scss';
import { Navigation } from 'swiper/modules';

const goods: HotPriceInterface[] = [
  {
    id: 1,
    image: '/img/hotPricesSlider/green_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    newPrice: '$999',
    oldPrice: '$1199',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    image: '/img/hotPricesSlider/gold_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    newPrice: '$999',
    oldPrice: '$999',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 3,
    image: '/img/hotPricesSlider/purple_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    newPrice: '$999',
    oldPrice: '$859',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 4,
    image: '/img/hotPricesSlider/red_phone.png',
    title: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    newPrice: '$899',
    oldPrice: '$859',
    screen: '6.7” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 5,
    image: '/img/hotPricesSlider/green_phone.png',
    title: 'Apple iPhone 14 Plus 128GB PRODUCT Black (MQ513)',
    newPrice: '$559',
    oldPrice: '$899',
    screen: '7.7” OLED',
    capacity: '256 GB',
    ram: '8 GB',
  },
  {
    id: 6,
    image: '/img/hotPricesSlider/gold_phone.png',
    title: 'Apple iPhone 13 Plus 128GB PRODUCT Silver (MQ513)',
    newPrice: '$959',
    oldPrice: '$1199',
    screen: '6.7” OLED',
    capacity: '128 GB',
    ram: '8 GB',
  },
];

export const HotPrice = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Hot prices</h1>

          <div className={styles['card__slider-buttons']}>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} disabled>
              {/* <img src="/img/icons/arrow_left.png" alt="Arrow left" /> */}
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`}>
              {/* <img src="/img/icons/right_arrow.svg" alt="Arrow right" /> */}
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${styles.prevBtn}`,
            nextEl: `.${styles.nextBtn}`,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {goods.map(good => (
            <SwiperSlide key={good.id}>
              <article className={styles.card} data-qa="card">
                <div className={styles.card__top}>
                  <img
                    src={good.image}
                    alt={good.title}
                    className={styles.card__image}
                  />
                </div>

                <h2 className={styles.card__title}>{good.title}</h2>

                <div className={styles.card__prices}>
                  <p className={styles.card__newPrice}>{good.newPrice}</p>
                  <p className={styles.card__oldPrice}>{good.oldPrice}</p>
                </div>

                <p className={styles.card__settings}>
                  <span className={styles['card__settings-name']}>Screen</span>
                  <span className={styles['card__settings-value']}>
                    {good.screen}
                  </span>

                  <span className={styles['card__settings-name']}>
                    Capacity
                  </span>
                  <span className={styles['card__settings-value']}>
                    {good.capacity}
                  </span>

                  <span className={styles['card__settings-name']}>RAM</span>
                  <span className={styles['card__settings-value']}>
                    {good.ram}
                  </span>
                </p>

                <div className={styles.card__buttons}>
                  <a
                    href="#buy"
                    className={styles['card__buttons-cart']}
                    data-qa="hover"
                  >
                    Add to cart
                  </a>

                  <a href="#" className={styles['card__buttons-fav']}>
                    <img src="/img/icons/fav.png" alt="favourite goods" />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HotPrice;
