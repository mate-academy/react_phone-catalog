import { SwiperData } from '../MySwiperProto/types/MSPtypes';
import { MSProvider } from './context/MSContext';
import { Swiper } from './components/Swiper';

type Props = {
  dataset: SwiperData[];
  clamp?: boolean;
  buttons?: boolean;
  swipeCoeff?: number;
  gap?: number;
  animationSpeed?: number;
  snap?: boolean;
  infinite?: boolean;
  treshold?: number;
};

export const MSwiper: React.FC<Props> = ({
  dataset,
  clamp = true,
  buttons = false,
  swipeCoeff = 1.2,
  gap = 0,
  animationSpeed = 150,
  snap = true,
  infinite = false,
  treshold = 0.1,
}) => {
  return (
    <MSProvider dataset={dataset} infinite={infinite} clamp={clamp} gap={gap}>
      <Swiper
        btn={buttons}
        swCoeff={swipeCoeff}
        anSpeed={animationSpeed}
        snap={snap}
        treshold={treshold}
      />
    </MSProvider>
  );
};
