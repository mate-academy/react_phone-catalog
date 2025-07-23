import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useExistingImages } from '../../hooks/useExistingImages';

export type ProductGalleryProps = {
  images: string[];
};

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const existingImages = useExistingImages(images);

  return (
    <div className="relative flex flex-col tablet:flex-row gap-4 items-center tablet:items-start w-full">
      <div
        className={clsx(
          'flex gap-[13px] overflow-auto',
          'flex-row mt-4 tablet:flex-col tablet:mt-0 tablet:overflow-visible',
          'order-2 tablet:order-1',
        )}
      >
        {existingImages.map((img, index) => (
          <button
            key={img}
            onClick={() => {
              setSelectedIndex(index);
              setIsZoomed(false);
            }}
            className={clsx(
              'border overflow-hidden flex-shrink-0 tablet:w-14 tablet:h-14 desktop:w-20 desktop:h-20',
              index === selectedIndex ? 'border-black' : 'border-transparent',
            )}
            style={{
              width: 'clamp(50px, 4.6875vw + 35px, 65px)',
              height: 'clamp(50px, 4.6875vw + 35px, 65px)',
            }}
          >
            <img
              src={img}
              alt={`Miniature ${index + 1}`}
              className="object-cover w-full h-full aspect-square border border-elements"
            />
          </button>
        ))}
      </div>

      <div
        className="relative w-full max-w-[350px] mx-auto order-1 tablet:order-2 tablet:self-start overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={images[selectedIndex]}
          alt={`Image ${selectedIndex + 1}`}
          className="w-full h-auto object-contain max-h-116"
        />
      </div>

      {isZoomed && (
        <div
          className="absolute z-50 w-[400px] h-[400px] bg-white border border-elements overflow-hidden shadow-lg hidden tablet:block"
          style={{
            top: '0',
            left: 'calc(100% + 16px)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="w-full h-full bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${images[selectedIndex]})`,
              backgroundPosition: `${-zoomPosition.x * 2 + 100}px ${-zoomPosition.y * 2 + 100}px`,
              backgroundSize: '700px',
            }}
          />
        </div>
      )}
    </div>
  );
};
