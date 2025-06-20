import { MutableRefObject, useEffect, useState } from 'react';

export const images = [
  {
    id: 1,
    first: 'Hr-img-primary-01.png',
    second: 'Hr-img-primary-02.png',
    third: 'Hr-img-primary-03.png',
  },

  {
    id: 2,
    first: 'header-image-02.jpg',
    second: 'header-image-02.jpg',
    third: 'header-image-02.jpg',
  },
  {
    id: 3,
    first: 'header-image-01.jpg',
    second: 'header-image-01.jpg',
    third: 'header-image-01.jpg',
  },
];

export const createAutoScroll = (
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>,
  direction: React.MutableRefObject<'right' | 'left'>,
  scrollContainer: React.RefObject<HTMLDivElement>,
  maxSteps: number,
  stepRef: React.MutableRefObject<number>,
) => {
  intervalRef.current = setInterval(() => {
    if (!scrollContainer || !intervalRef) {
      return;
    }

    if (direction.current === 'right') {
      if (stepRef.current === maxSteps) {
        direction.current = 'left';

        return;
      }

      scrolRight(scrollContainer);
      stepRef.current += 1;
    } else {
      if (stepRef.current === 0) {
        direction.current = 'right';
        scrolRight(scrollContainer);
        stepRef.current += 1;
      }

      scrolLeft(scrollContainer);
      stepRef.current -= 1;
    }
  }, 5000);
};

export const handleDotClick = (id: number) => {
  const target = document.querySelector(`[data-index="${id}"]`);

  // (елемент який скролиться ).scrollIntoView.(обє'кт поведінки, повільно швидко ..)
  target?.scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
    block: 'nearest',
  });
};

export const scrolRight = (
  scrollContainer: React.RefObject<HTMLDivElement>,
) => {
  if (scrollContainer.current) {
    scrollContainer.current.scrollBy({
      left: scrollContainer.current.clientWidth,
      behavior: 'smooth',
    });
  }
};

export const scrolLeft = (scrollContainer: React.RefObject<HTMLDivElement>) => {
  if (scrollContainer.current) {
    scrollContainer.current.scrollBy({
      left: -scrollContainer.current.clientWidth,
      behavior: 'smooth',
    });
  }
};

export const handleManualScrollLeft = (
  isScrolling: MutableRefObject<boolean>,
  stepRef: MutableRefObject<number>,
  scrollContainer: React.RefObject<HTMLDivElement>,
  direction: MutableRefObject<'left' | 'right'>,
  resetAutoScroll: () => void,
) => {
  if (isScrolling.current) {
    return;
  } // блокуємо, якщо прокрутка триває

  if (stepRef.current > 0) {
    isScrolling.current = true;
    scrolLeft(scrollContainer);
    stepRef.current -= 1;
    direction.current = 'left';
    resetAutoScroll();
  }

  setTimeout(() => {
    isScrolling.current = false;
  }, 500);
};

export const handleManualScrollRight = (
  isScrolling: MutableRefObject<boolean>,
  stepRef: MutableRefObject<number>,
  scrollContainer: React.RefObject<HTMLDivElement>,
  direction: MutableRefObject<'left' | 'right'>,
  resetAutoScroll: () => void,
  maxSteps: number,
) => {
  if (isScrolling.current) {
    return;
  }

  if (stepRef.current < maxSteps) {
    isScrolling.current = true;
    scrolRight(scrollContainer);
    stepRef.current += 1;
    direction.current = 'right';
    resetAutoScroll();
  }

  setTimeout(() => {
    isScrolling.current = false;
  }, 500);
};

export const useHeaderObserver = () => {
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entri => {
          if (entri.isIntersecting) {
            const target = entri.target as HTMLElement;

            setActiveImage(Number(target.dataset.index));
          }
        });
      },
      {
        root: document.querySelector('.header__bottom-slider-content'),
        threshold: 0.5,
      },
    );

    const observerElements = document.querySelectorAll(
      '.header__bottom-slider-content-item',
    );

    if (observerElements) {
      observerElements.forEach(el => observer.observe(el));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeImage;
};
