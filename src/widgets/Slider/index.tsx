import { BannerData, CatalogueProduct } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';

type Props = {
  mode: 'hero' | 'catalogue';
  data: BannerData[] | CatalogueProduct[] | null | undefined;
  title?: string;
};

export const Slider = ({ mode, data, title }: Props) => {
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
            amount={data.length}
            {...(title ? { title } : {})}
          />
        </SliderDataProvider>
      );
  }
};
