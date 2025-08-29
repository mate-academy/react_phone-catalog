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

  const SliderModel = () => (
    <Element
      /* The element and it props are being contained in config file. It guarantees
      safe and proper data type entry. I see no reason to break architecture and use loads of
      if/else/switch when I can make it different way*/
      //@ts-expect-error: runtime safety guaranteed by config and API.
      data={data}
      startIdx={startIdx}
      amount={(data as CatalogueProduct[] | BannerData[]).length}
      {...(title && { title })}
    />
  );

  switch (data) {
    case undefined:
      return <Skeleton error={err} />;
    case null:
      return <Skeleton />;
    default:
      return (
        <SliderDataProvider startIdx={startIdx}>
          <SliderModel />
        </SliderDataProvider>
      );
  }
};
