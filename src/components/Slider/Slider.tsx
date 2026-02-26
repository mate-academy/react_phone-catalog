import React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { SliderButtons } from "../SliderButtons";
import "swiper/css";
import styles from "./Slider.module.scss";
import { getAssetPath } from "../../utils";

const slides = [
  {
    imgMobile: getAssetPath("img/banner_mobile.png"),
    imgDesktop: getAssetPath("img/banner.png"),
  },
  {
    imgMobile: getAssetPath("img/banner_mobile.png"),
    imgDesktop: getAssetPath("img/banner.png"),
  },
  {
    imgMobile: getAssetPath("img/banner_mobile.png"),
    imgDesktop: getAssetPath("img/banner.png"),
  },
  {
    imgMobile: getAssetPath("img/banner_mobile.png"),
    imgDesktop: getAssetPath("img/banner.png"),
  },
];

interface SliderProps extends SwiperProps {}

export const Slider: React.FC<SliderProps> = ({
  spaceBetween = 50,
  slidesPerView = 1,
  ...rest
}) => {
  return (
    <Swiper
      className={styles.swiper}
      {...rest}
      modules={[Pagination, Autoplay, ...(rest.modules || [])]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 5000 }}
    >
      {slides.map((image, index) => (
        <SwiperSlide key={image.imgDesktop + index} className={styles.slide}>
          <img
            className={styles.image}
            alt="phone"
            src={window.innerWidth < 640 ? image.imgMobile : image.imgDesktop}
          />
        </SwiperSlide>
      ))}
      <SliderButtons />
    </Swiper>
  );
};
