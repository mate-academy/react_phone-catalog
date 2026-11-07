import type { EmblaOptionsType } from 'embla-carousel';
import { Typography } from '../../../atoms/Typography/Typography';
// Change this line to import your local component file (adjust the relative path if needed):
import React from 'react';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';
import { ButtonIcon } from '../../../atoms/Buttons/ButtonIcon';
import { ICONS } from '../../../../constants/icons';
import { useAutoplay } from '../js/EmblaCarouselAutoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { usePrevNextButtons } from '../js/EmblaCarouselArrowButtons';
import { ProductCard } from '../../ProductCard/ProductCard';
import type { Product } from '../../../../types/Product';
import cn from 'classnames';

type Props = {
  title: string;
  displayedSlides?: number;
  products: Product[];
  productCardHeight: number;
  hasDiscount?: boolean;
};

const OPTIONS: EmblaOptionsType = { loop: false, align: 'start' };

export const ProductsCarousel: React.FC<Props> = ({
  title,
  displayedSlides = 1,
  products,
  productCardHeight,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: false }),
  ]);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="flex items-center justify-between gap-4 pb-6">
        <Typography
          level="h2"
          className="min-w-0 wrap-break-words"
        >
          {title}
        </Typography>
        <div className="flex gap-4 -mr-1 md:mr-0 lg:-mr-px">
          <ButtonIcon
            className={cn('w-8 h-8 cursor-pointer', {
              'dark:bg-surface-2-dark': !prevBtnDisabled,
            })}
            handleClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            isDisabled={prevBtnDisabled}
            src={ICONS.ARROW.LEFT}
          />
          <ButtonIcon
            className={cn('w-8 h-8 cursor-pointer', {
              'dark:bg-surface-2-dark': !nextBtnDisabled,
            })}
            handleClick={() => onAutoplayButtonClick(onNextButtonClick)}
            isDisabled={nextBtnDisabled}
            src={ICONS.ARROW.RIGHT}
          />
        </div>
      </div>
      <div
        className="embla -mr-4 md:-mr-6 lg:-mr-4.5"
        style={
          { '--slide-size': `${100 / displayedSlides}%` } as React.CSSProperties
        }
      >
        <div
          className="embla__viewport"
          ref={emblaRef}
        >
          <div className="embla__container">
            {products.map((product) => (
              <div
                className="embla__slide "
                key={product.id}
              >
                <ProductCard
                  product={product}
                  className={'w-full'}
                  cardHeight={productCardHeight}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
