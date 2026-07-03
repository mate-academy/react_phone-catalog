//#region imports
import { SkeletonItem } from '../SkeletonItem';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { SliderSkeleton } from '../Slider/SliderSkeleton';
import { IconButtonSkeleton } from '../IconButton/IconButtonSkeleton';
import baseStyles from './base.module.scss';
import styles from './ProductSliderSkeleton.module.scss';
//#endregion

export const ProductSliderSkeleton = () => {
  const renderProductCardSkeleton = () => <ProductCardSkeleton />;

  return (
    <div className={baseStyles.slider}>
      <div className={baseStyles.topBar}>
        <SkeletonItem additionalClass={styles.title} />

        <div className={baseStyles.sliderButtons}>
          <IconButtonSkeleton />

          <IconButtonSkeleton />
        </div>
      </div>

      <SliderSkeleton
        slidesCount={4}
        gap={16}
        sliderClass={baseStyles.mainContainer}
        containerClass={baseStyles.container}
        renderSlide={renderProductCardSkeleton}
      />
    </div>
  );
};
