import {
  ComponentPropsWithRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import ArrowLeft from '/src/assets/icons/arrow-left.svg?react';
import ArrowRight from '/src/assets/icons/arrow-right.svg?react';
import cn from 'clsx';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      requestAnimationFrame(() => onSelect(emblaApi));
      emblaApi.on('reInit', onSelect).on('select', onSelect);
    }
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type ButtonProps = ComponentPropsWithRef<'button'>;

export const PrevButton: FC<ButtonProps> = props => {
  const { className, children, ...restProps } = props;

  return (
    <button className={cn('', className)} type="button" {...restProps}>
      <ArrowLeft className="size-[16px] fill-primary disabled:fill-icons" />
      {children}
    </button>
  );
};

export const NextButton: FC<ButtonProps> = props => {
  const { className, children, ...restProps } = props;

  return (
    <button className={cn('', className)} type="button" {...restProps}>
      <ArrowRight className="size-[16px] fill-primary disabled:fill-icons" />
      {children}
    </button>
  );
};
