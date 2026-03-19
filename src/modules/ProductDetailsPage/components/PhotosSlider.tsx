import cn from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { useThumbButton } from '../hooks/useThumbButton';
import { Button } from '../../shared/components/ui/Button/Button';
import type { FC } from 'react';

type Props = {
  images: string[];
  className?: string;
};

export const PhotosSlider: FC<Props> = ({ images }) => {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const { selectedIndex, onThumbButtonClick } = useThumbButton(
    emblaMainApi,
    emblaThumbsApi,
  );

  return (
    <>
      {/*<div className={cn('', className)}>*/}
      <div
        className="overflow-hidden sm:col-span-6 sm:col-start-2 xl:col-span-10 xl:col-start-3"
        ref={emblaMainRef}
      >
        <div className="ml-0 flex touch-pan-y touch-pinch-zoom">
          {images.map(image => (
            <div
              key={image}
              className="aspect-square size-full min-w-0 flex-[0_0_100%] translate-[0_0_0] pl-0"
            >
              <img
                src={image}
                alt=""
                className="aspect-square size-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 overflow-hidden sm:-order-1 sm:col-span-1 sm:col-start-1 sm:mt-0 xl:col-span-2"
        ref={emblaThumbsRef}
      >
        <div className="flex gap-2 sm:flex-col">
          {images.map((image, index) => (
            <Button
              key={image}
              onClick={() => onThumbButtonClick(index)}
              className={cn(
                'aspect-square size-full flex-[0_0_25%] border',
                selectedIndex === index
                  ? 'border-primary dark:border-d-white'
                  : 'border-elements dark:border-d-elements hover:border-primary dark:hover:border-d-white transition',
              )}
            >
              <img
                src={image}
                alt=""
                className="aspect-square size-full object-contain"
              />
            </Button>
          ))}
        </div>
      </div>
      {/*</div>*/}
    </>
  );
};
