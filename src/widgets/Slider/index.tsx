import { BaseProduct } from '@shared/types/APIReturnTypes';
import { BannerData } from '@entities/bannerSlide/types/bannerSlide';
import {
  bannerConfig,
  bannerHooksConfig,
  prodConfig,
  prodHooksConfig,
} from './model/configs';
import { SliderType } from './types/types';
import { SliderProvider } from './model/context/sliderContext';
import { MainSlider } from './ui';
import { useMemo } from 'react';

type Props = {
  dataset: BannerData[] | BaseProduct[];
  classNames: {
    viewport: string;
    pagination?: string;
    buttonPrev?: string;
    buttonNext?: string;
  };
  type: SliderType;
};

//TODO: re-access CSS props (clamp), fix buttons, fix pagination
export const Slider: React.FC<Props> = ({ dataset, classNames, type }) => {
  const config = useMemo(() => {
    return type === SliderType.BANNER ? bannerConfig : prodConfig;
  }, []);

  const hooksConfig = useMemo(() => {
    return type === SliderType.BANNER ? bannerHooksConfig : prodHooksConfig;
  }, []);
  const providerConfig = { dataset, mode: config.mode };

  return (
    <SliderProvider config={providerConfig} type={type}>
      <MainSlider classNames={classNames} hooksConfig={hooksConfig} />
    </SliderProvider>
  );
};
