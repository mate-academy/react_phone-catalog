import { useCallback, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

export function useSlider(
  gap: number,
  slideCounts: number,
  initialStep: number = 0,
  infinite: boolean = false,
) {
  //#region refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef<boolean>(true);

  const refs = useMemo(
    () => ({
      sliderRef,
      containerRef,
      isTransitioning,
    }),
    [],
  );
  //#endregion

  //#region controls
  const [step, setStep] = useState(initialStep);

  const goPrev = useCallback(() => setStep(s => (s > 0 ? s - 1 : s)), []);
  const goNext = useCallback(
    () => setStep(s => (s < slideCounts - 1 ? s + 1 : s)),
    [slideCounts],
  );
  const goToSlide = setStep;

  const controls = useMemo(
    () => ({
      goNext,
      goPrev,
      goToSlide,
    }),
    [goNext, goPrev, goToSlide],
  );
  //#endregion

  //#region scroll
  const [containerWidth, setContainerWidth] = useState(0);

  const maxScroll = useMemo(() => {
    const slider = sliderRef.current;
    const sliderWidth = containerWidth * slideCounts - gap * (slideCounts - 1);

    if (!slider) {
      return 0;
    }

    return sliderWidth - slider.clientWidth;
  }, [slideCounts, containerWidth, gap]);

  const currentScroll = useMemo(() => {
    let scroll = (containerWidth + gap) * step;

    if (scroll < 0) {
      scroll = 0;
    }

    if (scroll > maxScroll) {
      scroll = maxScroll;
    }

    return scroll;
  }, [step, containerWidth, maxScroll, gap]);
  //#endregion

  //#region infinite
  const resetInfiniteSliderPosition = useCallback(
    (targetSlide: number) => {
      isTransitioning.current = false;
      goToSlide(targetSlide);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isTransitioning.current = true;
        });
      });
    },
    [goToSlide],
  );

  const onTransitionEnd = useCallback(() => {
    if (!infinite) {
      return;
    }

    if (step === 0) {
      resetInfiniteSliderPosition(slideCounts - 2);
    }

    if (step === slideCounts - 1) {
      resetInfiniteSliderPosition(1);
    }
  }, [step, slideCounts, infinite, resetInfiniteSliderPosition]);
  //#endregion

  //#region handleResize
  const handleResize = useCallback((clientWidth: number) => {
    isTransitioning.current = false;
    setContainerWidth(clientWidth);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.current = true;
      });
    });
  }, []);

  useResizeObserver(containerRef, handleResize);
  //#endregion

  return {
    currentScroll,
    maxScroll,
    step,
    refs,
    controls,
    onTransitionEnd: infinite ? onTransitionEnd : undefined,
  };
}
