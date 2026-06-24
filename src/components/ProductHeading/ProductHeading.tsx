import React from "react";
import { Swiper } from "swiper/types";
import classNames from "classnames";
import styles from "./ProductHeading.module.scss";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

export interface BtnControls {
  allowLeft: boolean;
  allowRight: boolean;
}

interface Props {
  swiperRef: React.RefObject<Swiper | null>;
  title: string;
  productsLength: number;
  swiperButtonState: BtnControls;
}

const iconsPath = {
  arrowWhite: getAssetPath("img/general/icons/arrow-white.svg"),
  arrow: getAssetPath("img/general/icons/arrow.svg"),
};

export const ProductHeading: React.FC<Props> = ({
  swiperRef,
  title,
  swiperButtonState,
}) => {
  const { theme } = React.useContext(AppSettingsContext);

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
          className={classNames(styles.button, {
            [styles.buttonDisabled]: !swiperButtonState.allowLeft,
          })}
        >
          {swiperButtonState.allowLeft ? (
            <img
              className={styles.iconLeft}
              alt="arrow-left"
              src={theme === "light" ? iconsPath.arrow : iconsPath.arrowWhite}
            />
          ) : (
            <img
              className={styles.iconLeft}
              alt="arrow-left"
              src={iconsPath.arrow}
            />
          )}
        </button>
        <button
          onClick={slideNext}
          className={classNames(styles.button, {
            [styles.buttonDisabled]: !swiperButtonState.allowRight,
          })}
        >
          {swiperButtonState.allowRight ? (
            <img
              className={styles.iconRight}
              alt="arrow-left"
              src={theme === "light" ? iconsPath.arrow : iconsPath.arrowWhite}
            />
          ) : (
            <img
              className={styles.iconRight}
              alt="arrow-left"
              src={iconsPath.arrow}
            />
          )}
        </button>
      </div>
    </div>
  );
};
