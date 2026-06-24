import { CarouselIndicatorSvg } from '@/shared/ui/Icons/CarouselIndicatorSvg';

type CarouselIndicatorProps = {
  activeIndex: number;
  numberOfSlides: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  activeIndex,
  numberOfSlides,
  setActiveIndex,
}) => {
  return (
    <CarouselIndicatorSvg
      activeIndex={activeIndex}
      numberOfSlides={numberOfSlides}
      setActiveIndex={setActiveIndex}
    />
  );
};
