import cn from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
import { usePrevNextButtons } from '../../hooks/usePrevNextButtons';
import { NextButton, PrevButton } from './ArrowButtons';
import { ProductCard } from '../../../ProductsPage/components/ProductCard';
import { FC } from 'react';
import { Product } from '../../../../types';

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
        <h2 className="text-h2 text-primary dark:text-d-white">{title}</h2>
        <div className="flex gap-4">
          <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
          <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
        </div>
      </div>

      <div
        ref={emblaRef}
        className="mt-6 -mr-4 overflow-hidden sm:-mr-6 xl:mr-0"
      >
        <ul className="grid auto-cols-[75%] grid-flow-col sm:auto-cols-[41.072%] xl:auto-cols-[25.3527%]">
          {products.map(product => {
            return (
              <li key={product.itemId} className="mr-4">
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
