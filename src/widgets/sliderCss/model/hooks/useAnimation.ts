import { useCallback, useEffect, useRef } from 'react';
import { useSliderData, visualConfig } from '..';
import styles from '../../styles/noAnimationClass.module.scss';

export const useAnimation = () => {
  const { DOM, mechanics, measure, rerender } = useSliderData();
  const { gap } = visualConfig;
  const rafId = useRef<number | null>(null);

  const toggleTrackClass = (anim: boolean) => {
    const track = DOM.track.current as HTMLDivElement;

    track.classList.toggle(styles['is-dragging'], !anim);
  };

  const moveTrack = () => {
    const track = DOM.track.current as HTMLDivElement;

    track.style.transform = `translateX(${mechanics.offset.current}px)`;
  };

  const snap = (idx: number, anim: boolean) => {
    toggleTrackClass(anim);

    mechanics.offset.current = -idx * (gap + measure.itemWidth.current);
    moveTrack();

    mechanics.index.current = idx;
    rerender();
  };

  const af = {
    start: useCallback(() => {
      if (rafId.current) {
        return;
      }

      const loop = () => {
        moveTrack();
        rafId.current = requestAnimationFrame(loop);
      };

      rafId.current = requestAnimationFrame(loop);
    }, []),
    stop: useCallback(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    }, []),
  };

  useEffect(() => {
    return () => {
      if (rafId.current) {
        af.stop();
      }
    };
  }, []);

  return { toggleTrackClass, moveTrack, snap, af };
};
