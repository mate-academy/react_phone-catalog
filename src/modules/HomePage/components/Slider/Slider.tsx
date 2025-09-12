import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import 'swiper/scss';
import { SlideItem } from '../../interfaces/swiperInterface';

const slides: SlideItem[] = [
  {
    id: 1,
    image: '/img/slide_1.png',
    mainTitle: 'iPhone 14 Pro',
    subTitle: 'Pro.Beyond.',
    content: {
      title: 'Now available in our store!',
      text: 'Be the first!',
      buttonText: 'Order now',
      buttonLink: '#',
    },
  },
  {
    id: 2,
    image: '/img/category-phones.png',
    mainTitle: 'iPad 13',
    subTitle: 'Pro.Beyond.',
    content: {
      title: 'Check our latest arrivals!',
      text: 'New Edition!',
      buttonText: 'Buy now',
      buttonLink: '#',
    },
  },
  {
    id: 3,
    image: '/img/category-tablets.png',
    mainTitle: 'iPad 13 Pro',
    subTitle: 'Pro.Beyond.',
    content: {
      title: 'Special offers today!',
      text: 'Be the first!',
      buttonText: 'Shop now',
      buttonLink: '#',
    },
  },
];

export const Slider: React.FC = () => {
  return (
    <div className={styles.sliderWrapper}>
      <button className="slide-btn__prev">
        <img src="/img/icons/arrow_left.svg" alt="Arrow left" />
      </button>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: '.slide-btn__prev',
          nextEl: '.slide-btn__next',
        }}
        pagination={{ clickable: true, type: 'bullets' }}
        autoplay={{ delay: 5000 }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <div className={styles.slide__wrapper}>
                <div className={styles.slide__content}>
                  <h3 className={styles.slide__title}>
                    {slide.content.title}
                    <img
                      className={styles.slide__titleImg}
                      src="/img/icons/hand.png"
                      alt="ok hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>{slide.content.text}</p>
                  <a className={styles.slide__link} href="#">
                    {slide.content.buttonText}
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <h3 className={styles['slide__image-title']}>
                    {slide.mainTitle}
                  </h3>
                  <p className={styles['slide__image-text']}>
                    {slide.subTitle}
                  </p>
                  <img
                    className={styles.slide__img}
                    src={slide.image}
                    alt={slide.mainTitle}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="slide-btn__next">
        <img src="/img/icons/arrow_right.svg" alt="Arrow right" />
      </button>
    </div>
  );
};

export default Slider;
