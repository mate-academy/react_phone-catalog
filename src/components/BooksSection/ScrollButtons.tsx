import type { RefObject } from 'react';

interface ScrollButtonsProps {
  scrollRef?: RefObject<HTMLDivElement | null>;
  onScroll?: () => void;
  amount?: number;
  direction: 'left' | 'right';
}

export const ScrollButton = ({
  scrollRef,
  onScroll,
  amount,
  direction,
}: ScrollButtonsProps) => {
  const handleScroll = () => {
    if (onScroll) {
      onScroll();

      return;
    }

    if (scrollRef?.current) {
      const firstCard = scrollRef.current.querySelector(
        ':scope > *',
      ) as HTMLElement;
      const step =
        amount ||
        (firstCard ?
          firstCard.getBoundingClientRect().width +
          parseInt(getComputedStyle(firstCard).marginRight)
        : scrollRef.current.clientWidth);
      const scrollAmount = direction === 'left' ? -step : step;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="w-[40px] h-[40px] flex items-center justify-center transition-all duration-200 hover:scale-125 transition-colors flex-shrink-0"
      aria-label={`Scroll ${direction}`}
    >
      <span className="text-[20px] font-normal hover:font-black transition-all">
        {direction === 'left' ? '←' : '→'}
      </span>
    </button>
  );
};
