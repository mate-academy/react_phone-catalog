import { BannerData } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';

type Props = {
  mode: 'hero';
  data: BannerData[] | null | undefined;
};

export const SliderS = ({ mode, data }: Props) => {
  const { element: Element, skeleton: Skeleton, err, props } = configs[mode];

  switch (data) {
    case undefined:
      return <Skeleton error={err} />;
    case null:
      return <Skeleton />;
    default:
      const conf = { ...props, amount: data.length };

      return (
        <SliderDataProvider startIndex={conf.startIndex}>
          <Element data={data} props={conf} />
        </SliderDataProvider>
      );
  }
};
