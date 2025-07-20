import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
//@ts-expect-error: Swiper CSS has no TS types
import 'swiper/scss';
import ArrowLeft from '/icons/arrow_left_active.svg';
import ArrowRight from '/icons/arrow_right_active.svg';
import phonesBanner from '/img/banner-phones.png';
import tabletsBanner from '/img/banner-tablets.png';
import accessoriesBanner from '/img/banner-accessories.png';
import styles from './HeroSlider.module.scss';

type ProductCategoryType = 'phones' | 'tablets' | 'accessories';

type categoryItem = {
  category: ProductCategoryType;
  label: string;
  image: string;
};

const categoryBanners: categoryItem[] = [
  {
    category: 'phones',
    label: 'Mobile phones',
    image: phonesBanner,
  },
  {
    category: 'tablets',
    label: 'Tablets',
    image: tabletsBanner,
  },
  {
    category: 'accessories',
    label: 'Accessories',
    image: accessoriesBanner,
  },
];

export const HeroSlider: FC = () => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const isLargeScreen = useMediaQuery({ minWidth: 640 });

  useEffect(() => {
    if (paginationRef.current) {
      setSwiperReady(true);
    }
  }, []);

  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderBox}>
        {isLargeScreen && (
          <button className="swiper-button-prev">
            <img
              src={ArrowLeft}
              alt="Arrow Left"
              className="app-icon"
            />
          </button>
        )}

        {swiperReady && (
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 5000 }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: paginationRef.current!,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              // @ts-expect-error — for TypeScript
              swiper.params.pagination.el = paginationRef.current;
            }}
            className={styles.swiper}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {categoryBanners.map(({ category, label, image }) => (
              <SwiperSlide key={label}>
                <Link
                  to={category}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src={image}
                    alt="Slide"
                    className="swiper-img"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {isLargeScreen && (
          <button className="swiper-button-next">
            <img
              src={ArrowRight}
              alt="Arrow Right"
              className="app-icon"
            />
          </button>
        )}
      </div>
      <div
        ref={paginationRef}
        className="swiper-pagination"
      ></div>
    </div>
  );
};
