import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import cn from 'clsx';
import { DotButton, useDotButton } from './SliderDotButton';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './SliderArrowButtons';
import type { FC } from 'react';

type Props = {
  pictures: string[];
  className?: string;
};

export const PicturesSlider: FC<Props> = ({ pictures, className }) => {
  const LOOP = true;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: LOOP, align: 'start' },
    [Autoplay()],
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
          className="hidden sm:block p-[8px] shadow-inner shadow-icons hover:shadow-primary disabled:shadow-elements transition"
        />
        <div ref={emblaRef} className="grow overflow-hidden sm:mx-[16px]">
          <ul className="grid grid-flow-col auto-cols-[100%]">
            {pictures.map((picture, i) => {
              return (
                <li key={i} className="">
                  <picture>
                    <source srcSet={picture} />
                    <img
                      src={picture}
                      width={1040}
                      height={400}
                      alt="banner"
                      className="block aspect-square sm:aspect-auto object-cover"
                    />
                  </picture>
                </li>
              );
            })}
          </ul>
        </div>
        <NextButton
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
          className="hidden sm:block p-[8px] shadow-inner shadow-icons hover:shadow-primary disabled:shadow-elements transition"
        />
      </div>
      <div className="flex justify-center gap-[4px] mt-[8px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className="size-[24px]"
          >
            <div
              className={cn('w-[14px] h-[4px] bg-elements', {
                'bg-primary': index === selectedIndex,
              })}
            ></div>
          </DotButton>
        ))}
      </div>
    </section>
  );
};
