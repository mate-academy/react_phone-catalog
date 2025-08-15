import { BannerData } from '@shared/types';
import { SliderDataProvider } from './model/context/sliderContext';
import { configs } from './model';

type Props = {
  mode: 'hero';
  data: BannerData[];
};

export const SliderS = ({ mode, data }: Props) => {
  const { element: Element, contextConfig } = configs[mode];

  return (
    <SliderDataProvider contextConfig={contextConfig}>
      <Element data={data} />
    </SliderDataProvider>
  );
};
