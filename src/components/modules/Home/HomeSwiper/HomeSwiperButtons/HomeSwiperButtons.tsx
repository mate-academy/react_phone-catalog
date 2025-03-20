import { useSwiper } from "swiper/react";

import './HomeSwiperButtons.style.scss';

export const Buttons = () => {
  const swiper = useSwiper();
  return (
    <div className="buttons">
      <button
        className="buttons__button buttons__button--prev"
        onClick={() => swiper.slidePrev()}
      ></button>

      <button
        className="buttons__button buttons__button--next"
        onClick={() => swiper.slideNext()}
      ></button>
    </div>
  );
};

