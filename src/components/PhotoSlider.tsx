import { FC, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import cn from 'clsx';

type Props = {
  images: string[];
  className?: string;
};

export const PhotoSlider: FC<Props> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (emblaMainApi && emblaThumbsApi) {
        emblaMainApi.scrollTo(index);
      }
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (emblaMainApi && emblaThumbsApi) {
      setSelectedIndex(emblaMainApi.selectedScrollSnap());
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (emblaMainApi) {
      onSelect();
      emblaMainApi.on('select', onSelect).on('reInit', onSelect);
    }
  }, [emblaMainApi, onSelect]);

  return (
    // <div className={cn('', className)}>
    <>
      <div
        className="sm:col-span-6 sm:col-start-2 xl:col-span-10 xl:col-start-3 overflow-hidden"
        ref={emblaMainRef}
      >
        <div className="flex touch-pan-y touch-pinch-zoom ml-0">
          {images.map(image => (
            <div
              key={image}
              className="size-full aspect-square translate-[0_0_0] flex-[0_0_100%] min-w-0 pl-0"
            >
              <img
                src={image}
                alt=""
                className="size-full aspect-square object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="sm:col-span-1 sm:col-start-1 xl:col-span-2 sm:-order-1 overflow-hidden"
        ref={emblaThumbsRef}
      >
        <div className="flex sm:flex-col gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => onThumbClick(index)}
              className={cn(
                'grow-0 shrink-0 basis-1/4 size-full aspect-square border border-elements',
                {
                  'border-primary': selectedIndex === index,
                },
              )}
            >
              <img
                src={image}
                alt=""
                className="size-full aspect-square object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </>
    // </div>
  );
};
