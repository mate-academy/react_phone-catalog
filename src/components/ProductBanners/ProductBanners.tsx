import { useSlider } from '../../hooks/useSlider';

import { BannerButton } from '../../ui/BannerButton/BannerButton';

import { arrowRightIcon, arrowleftIcon } from '../../assets';
import { slideImages } from '../../constants/constants';
import { DEFAULT_VALUE } from '../../constants/default-values';
import { Slider } from '../Slider/Slider';

import styles from './ProductBanners.module.scss';

export const ProductBanners = () => {
  const sliderSettings = {
    pictureWidth: 1040,
    height: 400,
    step: 1,
    total: slideImages.length,
    gap: 10,
    autoplay: true,
    isFullScroll: true,
  };

  const { handlePrevSlide, handleNextSlide, currentIndex } = useSlider({
    ...sliderSettings,
  });

  return (
    <div className={styles.ProductBanners}>
      <BannerButton
        isDisabled={currentIndex === DEFAULT_VALUE}
        onClick={handlePrevSlide}
        type="Prev"
        icon={arrowleftIcon}
      />

      <Slider
        {...sliderSettings}
        index={currentIndex}
        isShowIndicators={true}
        total={slideImages.length}
      >
        {slideImages.map(image => (
          <img
            key={image}
            className={styles.Picture}
            src={image}
            alt="product-banner"
          />
        ))}
      </Slider>

      <BannerButton
        isDisabled={currentIndex === slideImages.length}
        onClick={handleNextSlide}
        type="Next"
        icon={arrowRightIcon}
      />
    </div>
  );
};
