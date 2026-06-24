import cn from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from '../hooks/useDotButton';
import { usePrevNextButtons } from '../../shared/hooks/usePrevNextButtons';
import { DotButton } from '../../shared/components/Slider/DotButton';
import { NextButton, PrevButton } from '../../shared/components/Slider/ArrowButtons';
import type { FC } from 'react';
import type { BannersType } from '../constants/banners';

type Props = {
  banners: BannersType;
  className?: string;
};

export const BannersSlider: FC<Props> = ({ banners, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000 })],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={cn('', className)}>
      <div className="flex">
        <PrevButton
          disabled={prevBtnDisabled}
          onClick={onPrevButtonClick}
          className="hidden sm:block"
        />
        <div ref={emblaRef} className="grow overflow-hidden sm:mx-4">
          <ul className="grid auto-cols-[100%] grid-flow-col">
            {banners.map(banner => {
              return (
                <li key={banner} className="">
                  <img
                    src={banner}
                    width={1040}
                    height={400}
                    alt="banner"
                    className="block aspect-square object-cover sm:aspect-auto"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <NextButton
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
          className="hidden sm:block"
        />
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            isActive={index === selectedIndex}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </section>
  );
};
