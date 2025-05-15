import React from 'react';
import styles from './HomePageSlider.module.scss';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import bannerMobile from '../../../public/img/banner-mobile.png';
import bannerTablet from '../../../public/img/banner-tablet.png';

export const HomePageSlider: React.FC = () => {
  const slides = [
    {
      mobileImage: bannerMobile,
      tabletImage: bannerTablet,
    },
    {
      mobileImage: bannerMobile,
      tabletImage: bannerTablet,
    },
    {
      mobileImage: bannerMobile,
      tabletImage: bannerTablet,
    },
  ];

  return (
    <section className={styles.slider}>
      <div className={styles.container}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className={styles.swiper}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <picture>
                <source media="(min-width: 639px)" srcSet={bannerTablet} />
                <img
                  src={slide.mobileImage}
                  alt={`Slide ${index} + 1`}
                  className={styles.image}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  // <section>
    //   <div id="carouselHeroIndicators" className="carousel slide">
    //     <div className="carousel-indicators">
    //       <button
    //         type="button"
    //         data-bs-target="#carouselHeroIndicators"
    //         data-bs-slide-to="0"
    //         className="active"
    //         aria-current="true"
    //         aria-label="Slide 1"
    //       ></button>
    //       <button
    //         type="button"
    //         data-bs-target="#carouselHeroIndicators"
    //         data-bs-slide-to="1"
    //         aria-label="Slide 2"
    //       ></button>
    //       <button
    //         type="button"
    //         data-bs-target="#carouselHeroIndicators"
    //         data-bs-slide-to="2"
    //         aria-label="Slide 3"
    //       ></button>
    //     </div>

    //     <div className="carousel-inner">
    //       <div className="carousel-item active">
    //         <picture>
    //           <source
    //             media="(min-width: 639px)"
    //             srcSet="/img/banner-tablet.png"
    //           />
    //           <img
    //             src="/img/banner-mobile.png"
    //             className="d-block w-100"
    //             alt="..."
    //           />
    //         </picture>
    //       </div>
    //       <div className="carousel-item">
    //         <picture>
    //           <source
    //             media="(min-width: 639px)"
    //             srcSet="/img/banner-tablet.png"
    //           />
    //           <img
    //             src="/img/banner-mobile.png"
    //             className="d-block w-100"
    //             alt="..."
    //           />
    //         </picture>
    //       </div>
    //       <div className="carousel-item">
    //         <picture>
    //           <source
    //             media="(min-width: 639px)"
    //             srcSet="/img/banner-tablet.png"
    //           />
    //           <img
    //             src="/img/banner-mobile.png"
    //             className="d-block w-100"
    //             alt="..."
    //           />
    //         </picture>
    //       </div>
    //     </div>
    //     <div className={styles.buttonsWrapper}>
    //       <button
    //         className="carousel-control-prev"
    //         type="button"
    //         data-bs-target="#carouselHeroIndicators"
    //         data-bs-slide="prev"
    //       >
    //         <span
    //           className="carousel-control-prev-icon"
    //           aria-hidden="true"
    //         ></span>
    //         <span className="visually-hidden">Previous</span>
    //       </button>
    //       <button
    //         className="carousel-control-next"
    //         type="button"
    //         data-bs-target="#carouselHeroIndicators"
    //         data-bs-slide="next"
    //       >
    //         <span
    //           className="carousel-control-next-icon"
    //           aria-hidden="true"
    //         ></span>
    //         <span className="visually-hidden">Next</span>
    //       </button>
    //     </div>
    //   </div>
  // </section>
  );
};
