import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
import styles from './styles.module.scss';
import { ProductCard } from '@/components/ProductCard';
import { usePhones } from '@/app/providers/Phones/PhoneContext';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'boneyard-js/react';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Autoplay } from 'swiper/modules';
import classNames from 'classnames';
import { Phone } from '@/shared/type';
import '@/bones/registry';

export const SectionHotPrice = () => {
  const { phones, loading, loadPhones } = usePhones();
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const defaultPhone: Phone = {
    id: 'apple-iphone-11-128gb-purple',
    category: 'phones',
    namespaceId: 'apple-iphone-11',
    name: 'Apple iPhone 11 128GB Purple',
    capacityAvailable: ['64GB', '128GB', '256GB'],
    capacity: '128GB',
    priceRegular: 1100,
    priceDiscount: 1050,
    colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
    color: 'purple',
    images: [
      'img/phones/apple-iphone-11/purple/00.webp',
      'img/phones/apple-iphone-11/purple/01.webp',
      'img/phones/apple-iphone-11/purple/02.webp',
      'img/phones/apple-iphone-11/purple/03.webp',
      'img/phones/apple-iphone-11/purple/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformative triple-camera system that adds tons of capability without complexity.',
          'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
        ],
      },
      {
        title: 'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
        text: [
          'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
        ],
      },
    ],
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 5x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  };

  return (
    <section>
      <div className={styles.titleContainer}>
        <div className={styles.titleBox}>
          <h2>{t('HomeTitle.hotPrice')}</h2>
          <div className={styles.buttonBox}>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonPrev)}
              iconFlipX
            ></ButtonSecond>
            <ButtonSecond
              className={classNames(styles.button, styles.sliderButtonNext)}
            ></ButtonSecond>
          </div>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <div >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            onResize={(swiper) => {
              swiper.setTranslate(swiper.translate);
            }}
            
            navigation={{
              prevEl: `.${styles.sliderButtonPrev}`,
              nextEl: `.${styles.sliderButtonNext}`,
            }}

            autoplay={
              loading
                ? {}
                : {
                    delay: 3500,
                    disableOnInteraction: true,
                  }
            }
            modules={[FreeMode, Navigation, Autoplay]}
            className={styles.swiper}
          >
            {phones?.slice(0, 10).map((phone) => (
              <SwiperSlide className={styles.slide} key={phone.id}>
                <ProductCard phone={phone} />
              </SwiperSlide>
            ))}

            {loading &&
              Array.from({ length: 10 }).map((_, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide}>
                    <Skeleton
                      name="blog-card"
                      loading={true}
                      color="var(--text)"
                      darkColor="var(--text )"
                      animate="shimmer"
                    >
                      <ProductCard phone={defaultPhone} />
                    </Skeleton>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
