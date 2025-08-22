import { BannerData } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';

type Props = {
  mode: 'hero';
  data: BannerData[] | null | undefined;
};

export const SliderS = ({ mode, data }: Props) => {
  const {
    element: Element,
    contextConfig,
    skeleton: Skeleton,
    err,
  } = configs[mode];

  switch (data) {
    case undefined:
      return <Skeleton error={err} />;
    case null:
      return <Skeleton />;
    default:
      return (
        <SliderDataProvider contextConfig={contextConfig}>
          <Element data={data} />
        </SliderDataProvider>
      );
  }
};
