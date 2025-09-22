import { BannerData } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';
import { Status } from '@features/index';
import { CatalogueData } from '@shared/api/types';
import { CatalogueSlider, HeroSlider } from './ui';

type HeroSliderProps = {
  mode: 'hero';
  data: BannerData[] | Status;
  title: '';
};

type CatalogueSliderProps = {
  mode: 'catalogue';
  data: CatalogueData | Status;
  title: string;
};

type SliderProps = HeroSliderProps | CatalogueSliderProps;

export const Slider = ({ mode, data, title }: SliderProps) => {
  const { skeleton: Skeleton, startIdx } = configs[mode];

  if (typeof data === 'string') {
    return <Skeleton data={data} />;
  }

  switch (mode) {
    case 'hero':
      return (
        <SliderDataProvider startIdx={startIdx}>
          <HeroSlider data={data} startIdx={startIdx} amount={data.length} />
        </SliderDataProvider>
      );
    case 'catalogue':
      if (data.items === null) {
        return <Skeleton data={Status.ERROR} />;
      } else {
        return (
          <SliderDataProvider startIdx={startIdx}>
            <CatalogueSlider
              data={data.items}
              startIdx={startIdx}
              amount={data.items && data.items.length}
              title={title}
            />
          </SliderDataProvider>
        );
      }
  }
};
