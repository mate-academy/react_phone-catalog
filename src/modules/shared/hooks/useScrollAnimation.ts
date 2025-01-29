import { useCallback, useRef } from 'react';

const getCapacity = (
  sliderWidth: number,
  itemWidth: number,
  columnGap: number,
) => {
  const width = itemWidth + columnGap;
  const capacity = Math.floor(sliderWidth / width) * width;

  const maxCapacity = capacity + itemWidth;

  if (maxCapacity <= sliderWidth) {
    return maxCapacity;
  }

  return capacity - columnGap;
};

const getParams = (
  slider: HTMLDivElement,
  targetItem: HTMLElement,
  right: boolean,
) => {
  let end: number;
  let distance: number;

  const start = slider.scrollLeft;

  if (right) {
    distance = targetItem.offsetLeft - start;

    end = Math.min(
      targetItem.offsetLeft,
      slider.scrollWidth - slider.offsetWidth,
    );
  } else {
    const sliderWidth = slider.offsetWidth + slider.offsetLeft * 2;

    const itemRight = targetItem.offsetLeft + targetItem.offsetWidth;
    const columnGap = parseInt(window.getComputedStyle(slider).columnGap);

    const sliderRight = Object.is(columnGap, NaN)
      ? sliderWidth
      : getCapacity(sliderWidth, targetItem.offsetWidth, columnGap);

    end = itemRight - sliderRight;
    distance = end - start;

    end = Math.max(0, end);
  }

  return [start, distance, end];
};

export const useScrollAnimation = (
  duration: number,
  timeout: number = 3000,
) => {
  const currentDuration = useRef(duration);
  const updatedTime = useRef<Date>(new Date());
  const currentAnimationFrame = useRef<number | null>(null);

  const smoothScroll = useCallback(
    (
      slider: HTMLDivElement,
      targetItem: HTMLElement,
      right: boolean = true,
    ) => {
      if (currentAnimationFrame.current !== null) {
        if (timeout) {
          currentDuration.current = 0;
          updatedTime.current = new Date();
        }

        cancelAnimationFrame(currentAnimationFrame.current);
      } else if (timeout) {
        if (!currentDuration.current) {
          const diff = new Date().getTime() - updatedTime.current.getTime();

          if (diff >= timeout) {
            currentDuration.current = duration;
          } else {
            updatedTime.current = new Date();
          }
        }
      }

      let startTime: number | null = null;
      const [start, distance, end] = getParams(slider, targetItem, right);

      const scroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;

        if (Math.abs(end - slider.scrollLeft) > 0.6) {
          if (!currentDuration.current) {
            // eslint-disable-next-line no-param-reassign
            slider.scrollLeft = end;
            currentAnimationFrame.current = requestAnimationFrame(scroll);

            return;
          }

          const run =
            timeElapsed < duration
              ? start + (distance * timeElapsed) / currentDuration.current
              : end;

          // eslint-disable-next-line no-param-reassign
          slider.scrollLeft = run;
          currentAnimationFrame.current = requestAnimationFrame(scroll);
        } else {
          currentAnimationFrame.current = null;
        }
      };

      currentAnimationFrame.current = requestAnimationFrame(scroll);
    },
    [duration, timeout],
  );

  return smoothScroll;
};
