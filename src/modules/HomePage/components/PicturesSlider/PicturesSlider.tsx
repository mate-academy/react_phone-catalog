import { useRef } from "react";

import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { banners } from "../../constants/banners";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./PicturesSlider.module.scss";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export const PicturesSlider = () => {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={classNames(styles.picturesSliderWrapper, "grid")}>
      <div ref={prevRef} className={styles.bunnerButtonPrev} />
      <div ref={nextRef} className={styles.bunnerButtonNext} />
      <div ref={paginationRef} className={styles.customSwiperPagination} />
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        spaceBetween={30}
        speed={1300}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            typeof swiper.params.pagination !== "boolean" &&
            swiper.params.pagination
          ) {
            swiper.params.pagination.el = paginationRef.current;
          }

          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className={styles.mySwiper}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slideContent}>
              <img src={banner} alt={`banner${i}`}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
