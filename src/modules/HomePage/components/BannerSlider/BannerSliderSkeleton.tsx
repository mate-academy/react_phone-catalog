//#region imports
import { IconButtonSkeleton } from '../../../shared/components/IconButton';
import { SlideSkeleton } from './components/Slide/SlideSkeleton';
import baseStyles from './base.module.scss';
//#endregion

export const BannerSliderSkeleton = () => (
  <div className={baseStyles.bannerSlider}>
    <div className={baseStyles.banner}>
      <div className={baseStyles.button}>
        <IconButtonSkeleton size="oval" />
      </div>

      <div className={baseStyles.currentSlide}>
        <SlideSkeleton />
      </div>

      <div className={baseStyles.button}>
        <IconButtonSkeleton size="oval" />
      </div>
    </div>
  </div>
);
