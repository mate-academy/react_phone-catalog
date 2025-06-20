import { SwiperData } from '../MySwiperProto/types/MSPtypes';
import { MSProvider } from './context/MSContext';
import { Swiper } from './components/Swiper';

type Props = {
  dataset: SwiperData[];
  clamp?: boolean;
  buttons?: boolean;
  swipeCoeff?: number;
  gap: number;
  animationSpeed: number;
  snap: boolean;
  infinite: boolean;
};

export const MSwiper: React.FC<Props> = ({
  dataset,
  clamp = true,
  buttons = false,
  swipeCoeff = 1.2,
  gap = 0,
  animationSpeed = 150,
  snap,
  infinite,
}) => {
  return (
    <MSProvider dataset={dataset} infinite={infinite}>
      <Swiper
        btn={buttons}
        clmp={clamp}
        swCoeff={swipeCoeff}
        gap={gap}
        anSpeed={animationSpeed}
        snap={snap}
      />
    </MSProvider>
  );
};
