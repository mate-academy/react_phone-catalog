import { Arrows } from './parts/Arrow';
import { Dots } from './parts/Dots';
import { SliderList } from './parts/SliderList';
import './BannerSlider.scss';
import { BannerSliderProvider } from './BannerSliderContext';

export const BannerSlider = () => {
  return (
    <div className="banner-slider">
      <BannerSliderProvider>

        <div className="banner-slider__content">

          <Arrows>
            <SliderList />
          </Arrows>

        </div>

        <Dots />

      </BannerSliderProvider>
    </div>
  );
};
