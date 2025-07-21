import { HooksConfig } from '../types/types';
import { SlButtons } from './button/sliderButton';
import { Carousel } from './carousel/carousel';
import { useSlider } from '../model/hooks/useSlider';
import { SliderPagination } from './pagination/sliderPagination';
import { useSlContext } from '../model/context/sliderContext';
// Todo: {pagination && <SliderPagination className={pagination as string} />}
type Props = {
  classNames: {
    viewport: string;
    pagination?: string;
    buttonPrev?: string;
    buttonNext?: string;
  };
  hooksConfig: HooksConfig;
};

export const MainSlider: React.FC<Props> = ({ classNames, hooksConfig }) => {
  const { viewport, buttonPrev, buttonNext, pagination } = classNames;
  const { gap, animationSpeed } = hooksConfig;
  const { handlers, onButton, disableButton, paginationHandler, getIndex } =
    useSlider({ hooksConfig });
  const { length } = useSlContext();

  return (
    <>
      {buttonPrev && buttonNext && (
        <SlButtons
          classNamePrev={buttonPrev}
          classNameNext={buttonNext}
          onClick={onButton}
          disableButton={disableButton}
        />
      )}
      <Carousel
        gap={gap}
        animationSpeed={animationSpeed}
        className={viewport}
        handlers={handlers}
      />
      {pagination && (
        <SliderPagination
          length={length}
          className={pagination}
          onClick={paginationHandler}
          getIndex={getIndex}
        />
      )}
    </>
  );
};
