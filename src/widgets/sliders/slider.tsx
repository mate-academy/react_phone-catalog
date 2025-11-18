import { CatalogueData } from '@shared/api';
import { UILoadStatus } from '@features/useUILoader';
import { SliderDataProvider } from '@shared/lib';
import { BannerData, SliderType } from '@shared/types';
import { BannerSlider } from './bannerSlider';
import { ProductSlider } from './productSlider';
import { CatalogueSlider } from './catalogueSlider';

type BannerProps = {
  model: SliderType.BANNER;
  props: BannerData[] | UILoadStatus;
};

type ProductProps = {
  model: SliderType.PRODUCT;
  props: { images: string[]; name: string } | UILoadStatus;
};

type CatalogueProps = {
  model: SliderType.CATALOGUE;
  props: {
    data: CatalogueData | UILoadStatus;
    title: string;
    lazy?: boolean;
  };
};

type Props = BannerProps | ProductProps | CatalogueProps;

export const Slider = ({ model, props }: Props) => {
  switch (model) {
    case SliderType.BANNER:
      return (
        <SliderDataProvider startIdx={1}>
          <BannerSlider data={props} />
        </SliderDataProvider>
      );

    case SliderType.PRODUCT:
      return (
        <SliderDataProvider startIdx={1}>
          <ProductSlider data={props} />
        </SliderDataProvider>
      );

    case SliderType.CATALOGUE:
      return (
        <SliderDataProvider startIdx={0}>
          <CatalogueSlider data={props.data} title={props.title} />
        </SliderDataProvider>
      );
  }
};
