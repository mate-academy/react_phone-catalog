import { Status } from '@features/index';
import { BannerData, Product } from '@shared/types';
import { HeroSkeleton } from './ui/heroSkeleton';
import { SliderDataProvider } from '@shared/lib/useSlider';
import { Slider } from './infiniteSlider';

type Props = {
  data: BannerData[] | Product | Status;
};

const isStatus = (data: unknown): data is Status => {
  return Object.values(Status).some(el => el === data);
};

const startIndex = 1;

export const InfiniteSlider = ({ data }: Props) => {
  if (isStatus(data)) {
    return <HeroSkeleton data={data} />;
  } else {
    return (
      <SliderDataProvider startIdx={startIndex}>
        <Slider data={data} />
      </SliderDataProvider>
    );
  }
};
