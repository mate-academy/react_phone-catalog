import { BannerData, CatalogueProduct } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';

type SliderProps = {
  mode: 'catalogue' | 'hero';
  data: CatalogueProduct[] | BannerData[] | null | undefined;
  title?: string;
};

export const Slider = ({ mode, data, title }: SliderProps) => {
  const { element: Element, skeleton: Skeleton, err, startIdx } = configs[mode];

  switch (data) {
    case undefined:
      return <Skeleton error={err} />;
    case null:
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
