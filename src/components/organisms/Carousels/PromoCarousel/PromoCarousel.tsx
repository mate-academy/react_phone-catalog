/* eslint-disable react-hooks/set-state-in-effect */
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrevNextButtons } from '../js/EmblaCarouselArrowButtons';
import { Typography } from '../../../atoms/Typography/Typography';
import { ButtonIcon } from '../../../atoms/Buttons/ButtonIcon';
import { ICONS } from '../../../../constants/icons';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';
import { useCallback, useEffect, useState } from 'react';

const OPTIONS: EmblaOptionsType = { loop: true, align: 'start' };

type Props = {
  banners: string[];
  squareBanners: string[];
};

export const PromoCarousel: React.FC<Props> = ({ banners, squareBanners }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);

      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.reset();
    },
    [emblaApi],
  );

  const handlePrevClick = useCallback(() => {
    onPrevButtonClick();
    const autoplay = emblaApi?.plugins().autoplay;
    if (autoplay) autoplay.reset();
  }, [emblaApi, onPrevButtonClick]);

  const handleNextClick = useCallback(() => {
    onNextButtonClick();
    const autoplay = emblaApi?.plugins().autoplay;
    if (autoplay) autoplay.reset();
  }, [emblaApi, onNextButtonClick]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('init', onInit);
    emblaApi.on('init', onSelect);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('init', onInit);
      emblaApi.off('init', onSelect);
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <Typography
        level="h1"
        className="px-4 md:px-0 lg:px-0 pb-6 md:pb-8"
      >
        Welcome to Nice Gadgets store!
      </Typography>
      <div className="grid grid-cols-[auto_1fr_auto] md:gap-[19px] lg:gap-[16px]">
        <ButtonIcon
          className="w-8 h-full hidden md:block dark:bg-surface-2-dark cursor-pointer"
          handleClick={handlePrevClick}
          isDisabled={prevBtnDisabled}
          src={ICONS.ARROW.LEFT}
        />
        <div
          className="embla flex-1 min-w-0"
          style={
            {
              '--slide-spacing': '0px',
            } as React.CSSProperties
          }
        >
          <div
            className="embla__viewport"
            ref={emblaRef}
          >
            <div className="embla__container">
              {banners.map((banner, index) => (
                <div
                  className="embla__slide"
                  key={banner}
                >
                  <img
                    className="w-full aspect-[2.6/1] object-cover hidden md:block"
                    src={banner}
                    alt={banner.split('.')[0]}
                  />

                  <img
                    className="w-full aspect-square object-cover block md:hidden"
                    src={squareBanners[index]}
                    alt={squareBanners[index].split('.')[0]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ButtonIcon
          className="w-8 h-full hidden md:block dark:bg-surface-2-dark cursor-pointer"
          handleClick={handleNextClick}
          isDisabled={nextBtnDisabled}
          src={ICONS.ARROW.RIGHT}
        />
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onDotButtonClick(index)}
            className={`h-1 transition-all duration-300 rounded-sm ${
              index === selectedIndex ?
                'w-[14px] bg-primary dark:bg-white'
              : 'w-[14px] bg-elements hover:bg-secondary dark:bg-elements'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};
