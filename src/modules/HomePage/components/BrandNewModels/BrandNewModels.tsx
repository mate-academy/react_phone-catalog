import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { NewModalsInterface } from '../../interfaces/newModalsInterface';
import styles from './BrandNewModals.module.scss';

const modals: NewModalsInterface[] = [
  {
    id: 1,
    image: '/img/newModalsSlider/silver_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: '$999',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    image: '/img/newModalsSlider/deep_purple_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    price: '$999',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 3,
    image: '/img/newModalsSlider/gold_phone.png',
    title: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    price: '$999',
    screen: '6.1” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 4,
    image: '/img/newModalsSlider/red_phone.png',
    title: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    price: '$859',
    screen: '6.7” OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 5,
    image: '/img/newModalsSlider/deep_purple_phone.png',
    title: 'Apple iPhone 14 Plus 128GB PRODUCT Black (MQ513)',
    price: '$559',
    screen: '7.7” OLED',
    capacity: '256 GB',
    ram: '8 GB',
  },
  {
    id: 6,
    image: '/img/newModalsSlider/silver_phone.png',
    title: 'Apple iPhone 13 Plus 128GB PRODUCT Silver (MQ513)',
    price: '$959',
    screen: '6.7” OLED',
    capacity: '128 GB',
    ram: '8 GB',
  },
];

export const BrandNewModals: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Brand new models</h1>

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
          {modals.map(modal => (
            <SwiperSlide key={modal.id}>
              <article className={styles.card} data-qa="card">
                <div className={styles.card__top}>
                  <img
                    src={modal.image}
                    alt={modal.title}
                    className={styles.card__image}
                  />
                </div>

                <h2 className={styles.card__title}>{modal.title}</h2>

                <p className={styles.card__price}>{modal.price}</p>

                <p className={styles.card__settings}>
                  <span className={styles['card__settings-name']}>Screen</span>
                  <span className={styles['card__settings-value']}>
                    {modal.screen}
                  </span>

                  <span className={styles['card__settings-name']}>
                    Capacity
                  </span>
                  <span className={styles['card__settings-value']}>
                    {modal.capacity}
                  </span>

                  <span className={styles['card__settings-name']}>RAM</span>
                  <span className={styles['card__settings-value']}>
                    {modal.ram}
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

export default BrandNewModals;
