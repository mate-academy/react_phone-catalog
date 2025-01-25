import { useCallback, useRef } from 'react';

export const useScrollAnimation = (
  duration: number,
  timeout: number = 3000,
) => {
  const currentDuration = useRef(duration);
  const updatedTime = useRef<Date>(new Date());
  const currentAnimationFrame = useRef<number | null>(null);

  const getParams = useCallback(
    (slider: HTMLDivElement, targetItem: HTMLElement) => {
      let end: number;
      let distance: number;

      const start = slider.scrollLeft;
      const right = start < targetItem.offsetLeft;

      if (right) {
        distance = targetItem.offsetLeft - start;

        end = Math.min(
          targetItem.offsetLeft,
          slider.scrollWidth - slider.offsetWidth,
        );
      } else {
        distance =
          targetItem.offsetLeft +
          targetItem.offsetWidth -
          start -
          slider.offsetWidth;

        end = Math.max(
          0,
          targetItem.offsetLeft + targetItem.offsetWidth - slider.offsetWidth,
        );
      }

      return [start, distance, end];
    },
    [],
  );

  const smoothScroll = useCallback(
    (slider: HTMLDivElement, targetItem: HTMLElement) => {
      if (currentAnimationFrame.current !== null) {
        currentDuration.current = 0;
        updatedTime.current = new Date();

        cancelAnimationFrame(currentAnimationFrame.current);
      } else if (!currentDuration.current) {
        const diff = new Date().getTime() - updatedTime.current.getTime();

        if (diff >= timeout) {
          currentDuration.current = duration;
        } else {
          updatedTime.current = new Date();
        }
      }

      let startTime: number | null = null;
      const [start, distance, end] = getParams(slider, targetItem);

      const scroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;

        if (Math.abs(slider.scrollLeft - end) >= 1) {
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
    [duration, getParams, timeout],
  );

  return smoothScroll;
};
