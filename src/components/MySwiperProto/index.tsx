import { MSPSwiper } from './components/swiper';
import { SwiperProvider } from './context/MSPContext';
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
}) => {
  const autoplayObj: Autoplay = {
    direction: direction,
    delay: delay,
    times: times,
  };

  return (
    <SwiperProvider dataset={dataset} infinite={infinite}>
      <MSPSwiper
        clamp={clamp}
        buttons={buttons}
        pagination={pagination}
        autoplay={autoplay ? autoplayObj : false}
        animationSpeed={animationSpeed}
        gap={gap}
      />
    </SwiperProvider>
  );
};
