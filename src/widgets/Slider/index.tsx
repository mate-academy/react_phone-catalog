/* eslint-disable prettier/prettier */
import { Status } from '@features/index';
import { BannerData, CatalogueProduct } from '@shared/types';
import { SliderDataProvider } from '@shared/lib/useSlider';
import { Slider } from './infiniteSlider';
import { CatalogueSlider } from './catalogueSlider';

type ProductProps = {
  images: string[];
  name: string;
};

type CatalogueProps = {
  array: CatalogueProduct[];
  title: string;
};

type Props = {
  data:
  | BannerData[]
  | ProductProps
  | CatalogueProps
  | Status;
};

const isStatus = (data: unknown): data is Status => {
  return Object.values(Status).some(el => el === data);
};

type Check = BannerData[] | ProductProps | CatalogueProps;

const isCatalogue = (data: Check): data is CatalogueProps => {
  if (Array.isArray(data)) {
    return false;
  } else {
    return Object.keys(data).some(el => el === 'title');
  }
};

const INFINITE_START_INDEX = 1;
const REGULAR_START_INDEX = 1;

export const InfiniteSlider = ({ data }: Props) => {
  if (isStatus(data)) {
    return <div></div>;
  } else {
    if (isCatalogue(data)){
      return (
        <SliderDataProvider startIdx={REGULAR_START_INDEX}>
          <CatalogueSlider {...data} />
        </SliderDataProvider>
      );
    } else {
      return (
        <SliderDataProvider startIdx={INFINITE_START_INDEX}>
          <Slider data={data} />
        </SliderDataProvider>
      );
    }
  }
};
