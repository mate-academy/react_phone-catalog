import { MSPSwiper } from './components/swiper';
import { MSPProvider } from './context/useMSPContext';
import { Autoplay, Direction, SwiperData } from './types/MSPtypes';

type Props = {
  dataset: SwiperData[];
  infinite?: boolean;
  clamp?: boolean;
  buttons?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  direction?: Direction;
  delay?: number;
  times?: number;
  animationSpeed?: number;
  gap?: number;
  swipeCoeff?: number;
};

export const MeinSwiper: React.FC<Props> = ({
  dataset,
  infinite = false,
  clamp = true,
  buttons = false,
  pagination = false,
  autoplay = false,
  animationSpeed = 150,
  direction = Direction.RIGHT,
  delay = 5000,
  times = Infinity,
  gap = 0,
  swipeCoeff = 1.2,
}) => {
  const autoplayObj: Autoplay = {
    direction: direction,
    delay: delay,
    times: times,
  };

  return (
    <MSPProvider
      dataset={dataset}
      infinite={infinite}
      clamp={clamp}
      autoplay={autoplay ? autoplayObj : false}
      animationSpeed={animationSpeed}
      gap={gap}
      swipeCoeff={swipeCoeff}
    >
      <MSPSwiper buttons={buttons} pagination={pagination} />
    </MSPProvider>
  );
};
