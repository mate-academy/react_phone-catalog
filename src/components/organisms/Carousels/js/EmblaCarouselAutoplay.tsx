import { useCallback, useEffect, useState } from 'react';
import { type EmblaCarouselType } from 'embla-carousel';

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined,
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      autoplay.stop();
      callback();
    },
    [emblaApi],
  );

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const syncAutoplayState = () => {
      queueMicrotask(() => setAutoplayIsPlaying(autoplay.isPlaying()));
    };

    const handlePlay = () => setAutoplayIsPlaying(true);
    const handleStop = () => setAutoplayIsPlaying(false);

    syncAutoplayState();
    emblaApi
      .on('autoplay:play', handlePlay)
      .on('autoplay:stop', handleStop)
      .on('reInit', syncAutoplayState);

    return () => {
      emblaApi.off('autoplay:play', handlePlay);
      emblaApi.off('autoplay:stop', handleStop);
      emblaApi.off('reInit', syncAutoplayState);
    };
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    onAutoplayButtonClick,
  };
};
