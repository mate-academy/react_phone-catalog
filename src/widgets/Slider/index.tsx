import { BannerData, CatalogueProduct } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';
import { LoadingStates } from '@features/index';

type HeroSliderProps = {
  mode: 'hero';
  data: BannerData[] | LoadingStates;
  title: '';
};

type CatalogueSliderProps = {
  mode: 'catalogue';
  data: CatalogueProduct[] | null | LoadingStates;
  title: string;
};

type SliderProps = HeroSliderProps | CatalogueSliderProps;

export const Slider = ({ mode, data, title }: SliderProps) => {
  const { element: Element, skeleton: Skeleton, err, startIdx } = configs[mode];

  const nullCaseError = 'Oops... There is no items here yet...';

  switch (data) {
    case LoadingStates.ERROR:
      return <Skeleton error={err} />;
    case null:
      return <Skeleton error={nullCaseError} />;
    case LoadingStates.LOADING:
      return <Skeleton />;
    default:
      return (
        <SliderDataProvider startIdx={startIdx}>
          <Element
            data={data}
            startIdx={startIdx}
            amount={(data as CatalogueProduct[] | BannerData[]).length}
            {...(title && { title })}
          />
        </SliderDataProvider>
      );
  }
};
