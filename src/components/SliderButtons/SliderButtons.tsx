import React from "react";
import { useSwiper } from "swiper/react";
import styles from "./SliderButtons.module.scss";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

interface Props {
  prevButtonStyles?: React.CSSProperties;
  nextButtonStyles?: React.CSSProperties;
  imageStyles?: React.CSSProperties;
  wrapperStyles?: React.CSSProperties;
}
export const SliderButtons: React.FC<Props> = ({
  prevButtonStyles,
  nextButtonStyles,
  imageStyles,
  wrapperStyles,
}) => {
  const { theme } = React.useContext(AppSettingsContext);
  const iconsPath = {
    arrow: getAssetPath("img/general/icons/arrow.svg"),
    arrowWhite: getAssetPath("img/general/icons/arrow-white.svg"),
  };

  const swiper = useSwiper();

  const prevSlide = () => {
    swiper.slidePrev();
  };

  const nextSlide = () => {
    swiper.slideNext();
  };

  return (
    <div className={styles.buttons} style={wrapperStyles}>
      <button
        onClick={prevSlide}
        className={`${styles.prevButton} button`}
        style={prevButtonStyles}
      >
        <img
          className={styles.prevIcon}
          alt="up-arrow"
          src={theme === "light" ? iconsPath.arrow : iconsPath.arrowWhite}
          style={imageStyles}
        />
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.nextButton} button`}
        style={nextButtonStyles}
      >
        <img
          className={styles.nextIcon}
          alt="up-arrow"
          src={theme === "light" ? iconsPath.arrow : iconsPath.arrowWhite}
          style={imageStyles}
        />
      </button>
    </div>
  );
};
