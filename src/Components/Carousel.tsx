/* eslint-disable max-len */
import classNames from 'classnames';
import {
  ReactNode, useEffect, useRef, useState,
} from 'react';

type Props = {
  children: ReactNode[];
  imageWidth?: number;
  delay?: number;
};

let currentIndex = 0;
let prevIndex = 0;

const Carousel: React.FC<Props> = ({
  children,
  imageWidth = 1020,
  delay = 150,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimation, setIsAnimation] = useState(false);
  const [images, setImages] = useState<NodeListOf<Element>>(
    document.querySelectorAll('.carousel-image'),
  );
  const totalImages = images.length;

  useEffect(() => {
    setImages(document.querySelectorAll('.carousel-image'));
  }, [children]);

  useEffect(() => {
    currentIndex = 0;
    prevIndex = 0;
  }, []);

  const swipe = (direction: 'left' | 'right') => {
    if (!carouselRef.current || isAnimation) {
      return;
    }

    setIsAnimation(true);
    prevIndex = currentIndex;

    switch (direction) {
      case 'left': {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        carouselRef.current.style.transform = `translateX(-${
          imageWidth + 40
        }px)`;
        carouselRef.current.insertBefore(
          images[currentIndex],
          carouselRef.current.firstChild,
        );
        break;
      }

      case 'right': {
        currentIndex = (currentIndex + 1) % totalImages;
        carouselRef.current.classList.add('transition-all');
        carouselRef.current.style.transform = `translateX(-${
          imageWidth + 40
        }px)`;
        break;
      }

      default:
        return;
    }

    setTimeout(() => {
      if (!carouselRef.current) {
        return;
      }

      switch (direction) {
        case 'left': {
          carouselRef.current.classList.add('transition-all');
          carouselRef.current.style.transform = '';
          break;
        }

        case 'right': {
          carouselRef.current.appendChild(images[prevIndex]);
          carouselRef.current.classList.remove('transition-all');
          carouselRef.current.style.transform = '';
          setIsAnimation(false);
          break;
        }

        default:
      }
    }, delay);

    setTimeout(() => {
      if (!carouselRef.current || direction === 'right') {
        return;
      }

      carouselRef.current.classList.remove('transition-all');
      setIsAnimation(false);
    });
  };

  const swipeLeft = () => swipe('left');
  const swipeRight = () => swipe('right');

  return (
    <>
      <div className="col-span-12  flex justify-center gap-4 ">
        <button
          className="relative z-10 flex h-full w-8 items-center justify-center border border-Icons bg-white transition-all hover:border-Primary"
          type="button"
          onClick={swipeLeft}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-Primary"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>

        <section className="flex h-full items-center justify-center overflow-hidden">
          <div ref={carouselRef} className="flex w-[1040px] gap-5">
            {children}
          </div>
        </section>

        <button
          className="relative right-0 z-10 flex h-full w-8 items-center justify-center border border-Icons bg-white transition-all hover:border-Primary"
          type="button"
          onClick={swipeRight}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-Primary"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
      </div>
      <div className="col-span-full flex justify-center">
        {Array.from(images).map((_, i) => (
          <div
            className="flex h-[24px] w-[28px] items-center justify-center"
            key={_.innerHTML}
          >
            <div
              className={classNames('h-1 w-[14px] transition-all', {
                'bg-Primary': currentIndex === i,
                'bg-Elements': currentIndex !== i,
              })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
