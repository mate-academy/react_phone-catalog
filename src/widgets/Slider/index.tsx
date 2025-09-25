import { BannerData, Product } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs, SliderMode } from './model';
import { Status } from '@features/index';
import { CatalogueData } from '@shared/api/types';
import { CatalogueSlider, HeroSlider, ProdSlider } from './ui';

type HeroSliderProps = {
  mode: 'hero';
  data: BannerData[] | Status;
  title?: '';
};

type CatalogueSliderProps = {
  mode: 'catalogue';
  data: CatalogueData | Status;
  title: string;
};

type ProdSliderProps = {
  mode: SliderMode.PRODUCT_CARD;
  data: Product | Status;
  title: '';
};

type SliderProps = HeroSliderProps | CatalogueSliderProps | ProdSliderProps;

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

    case SliderMode.PRODUCT_CARD:
      return (
        <SliderDataProvider startIdx={startIdx}>
          <ProdSlider
            data={data}
            startIdx={startIdx}
            amount={data.images && data.images.length}
          />
        </SliderDataProvider>
      );
  }
};
