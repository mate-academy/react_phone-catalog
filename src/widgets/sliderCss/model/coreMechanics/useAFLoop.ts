/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useSliderData } from '../context/sliderContext';
import { manipulate } from '../helpers';

export const useAFLoop = () => {
  const { ids, DOM, mechanics } = useSliderData();
  const af = {
    start: useCallback(() => {
      if (ids.rafId.current) {
        return;
      }

      const loop = () => {
        manipulate.moveTrack(
          DOM.track.current as HTMLDivElement,
          mechanics.offset.current,
        );
        ids.rafId.current = requestAnimationFrame(loop);
      };

      ids.rafId.current = requestAnimationFrame(loop);
    }, []),
    stop: useCallback(() => {
      if (ids.rafId.current) {
        cancelAnimationFrame(ids.rafId.current);
        ids.rafId.current = null;
      }
    }, []),
  };

  useEffect(() => {
    return () => {
      af.stop();
    };
  }, []);

  return { af };
};
