import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
import cn from 'clsx';
import { ProductCard } from './ProductCard';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './SliderArrowButtons';
import { FC } from 'react';
import { Product } from '../types';

type ProductsCarouselProps = {
  title: string;
  products: Product[];
  className?: string;
};

export const ProductsSlider: FC<ProductsCarouselProps> = ({
  title,
  products,
  className,
}) => {
  const LOOP = false;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: LOOP, align: 'start' },
    // [Autoplay()],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={cn('', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-h2 text-primary">{title}</h2>
        <div className="flex gap-[16px]">
          <PrevButton
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
            className="p-[8px] shadow-inner shadow-icons hover:shadow-primary disabled:shadow-elements transition"
          />
          <NextButton
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
            className="p-[8px] shadow-inner shadow-icons hover:shadow-primary disabled:shadow-elements transition"
          />
        </div>
      </div>

      <div
        ref={emblaRef}
        className="overflow-hidden mr-[-16px] mt-[24px] sm:mr-[-24px] xl:mr-[0]"
      >
        <ul className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[41.072%] xl:auto-cols-[25.3527%]">
          {products.map(product => {
            return (
              <li key={product.id} className="mr-[16px]">
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
