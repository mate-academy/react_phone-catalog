import { BaseProduct } from '@shared/types/APITypes';
import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import {
  AutoplayParams,
  defaultConfig,
  SliderConfig,
} from './model/defaultConfig';
import { HooksConfig, SliderType, VisualConfig } from './lib/types';
import { SliderProvider } from './model/context/sliderContext';
import { FCSlider } from './ui';
import { useMemo } from 'react';

type Props = {
  dataset: BannerData[] | BaseProduct[];
  sliderConfig: SliderConfig;
  classNames: {
    viewport: string;
    pagination?: string;
    buttonPrev?: string;
    buttonNext?: string;
  };
  type: SliderType;
};

export const Slider: React.FC<Props> = ({
  dataset,
  sliderConfig,
  classNames,
  type,
}) => {
  const config = { ...defaultConfig, ...sliderConfig };
  const providerConfig = { dataset, mode: config.mode };

  const hooksConfig: HooksConfig = useMemo(
    () => ({
      swipeCoeff: config.swipeCoeff as number,
      threshold: config.threshold as number,
      autoplay: config.autoplay as AutoplayParams,
    }),
    [],
  );

  const visualConfig: VisualConfig = useMemo(
    () => ({
      gap: config.gap as number,
      animationSpeed: config.animationSpeed as number,
    }),
    [],
  );

  return (
    <SliderProvider config={providerConfig} type={type}>
      <FCSlider
        classNames={classNames}
        visualConfig={visualConfig}
        hooksConfig={hooksConfig}
      />
    </SliderProvider>
  );
};
