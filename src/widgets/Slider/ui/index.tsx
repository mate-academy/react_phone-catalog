import { HooksConfig, VisualConfig } from '../lib/types';
import { SlButtons } from './button/sliderButton';
import { Carousel } from './carousel/carousel';
import { useSlider } from '../model/hooks/useSlider';
// Todo: {pagination && <SliderPagination className={pagination as string} />}
type Props = {
  classNames: {
    viewport: string;
    pagination?: string;
    buttonPrev?: string;
    buttonNext?: string;
  };
  visualConfig: VisualConfig;
  hooksConfig: HooksConfig;
};

export const FCSlider: React.FC<Props> = ({
  classNames,
  visualConfig,
  hooksConfig,
}) => {
  const { viewport, buttonPrev, buttonNext } = classNames;
  const { handlers, onButton, disableButton } = useSlider({
    visualConfig,
    hooksConfig,
  });

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
        visualConfig={visualConfig}
        className={viewport}
        handlers={handlers}
      />
    </>
  );
};
