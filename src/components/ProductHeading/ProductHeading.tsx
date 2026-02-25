import React from "react";
import { Swiper } from "swiper/types";
import classNames from "classnames";
import styles from "./ProductHeading.module.scss";

export interface btnControls {
  allowLeft: boolean;
  allowRight: boolean;
}

interface Props {
  swiperRef: React.RefObject<Swiper | null>;
  title: string;
  productsLength: number;
  swiperButtonState: btnControls;
}

const iconsPath = {
  bannerMobile: "./img/banner_mobile.png",
  bannerTablet: "/img/banner_tablet.png",
  arrowWhite: "/img/general/icons/arrow-white.svg",
  arrow: "/img/general/icons/arrow.svg",
  heart: "/public/img/general/icons/heart.svg",
};

export const ProductHeading: React.FC<Props> = ({
  swiperRef,
  title,
  swiperButtonState,
}) => {
  const slideNext = () => {
    if (!swiperRef.current) {
      return;
    }
    swiperRef.current?.slideNext();
  };

  const slidePrev = () => {
    if (!swiperRef.current) {
      return;
    }
    swiperRef.current?.slidePrev();
  };

  return (
    <div className={styles.heading}>
      <h2 className="heading__title title text-h2">{title}</h2>
      <div className={styles.buttons}>
        <button
          onClick={slidePrev}
          className={classNames("heading__left-button", "button", {
            disabled: !swiperButtonState.allowLeft,
          })}
        >
          {swiperButtonState.allowLeft ? (
            <img
              className="heading__icon-left"
              alt="arrow-left"
              src={iconsPath.arrowWhite}
            />
          ) : (
            <img
              className="heading__icon-left"
              alt="arrow-left"
              src={iconsPath.arrow}
            />
          )}
        </button>
        <button
          onClick={slideNext}
          className={classNames("heading__right-button", "button", {
            disabled: !swiperButtonState.allowRight,
          })}
        >
          {swiperButtonState.allowRight ? (
            <img
              className="heading__icon-right"
              alt="arrow-left"
              src={iconsPath.arrowWhite}
            />
          ) : (
            <img
              className="heading__icon-right"
              alt="arrow-left"
              src={iconsPath.arrow}
            />
          )}
        </button>
      </div>
    </div>
  );
};
