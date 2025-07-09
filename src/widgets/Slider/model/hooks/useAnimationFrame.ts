import { useCallback, useEffect, useRef } from 'react';

export function useAF(fn: () => void) {
  const rafID = useRef<number | null>(null);
  const saved = useRef(fn);

  useEffect(() => {
    saved.current = fn;
  }, [fn]);

  const loop = useCallback(() => {
    saved.current();
    rafID.current = requestAnimationFrame(loop);
  }, []);

  const stopAF = useCallback(() => {
    if (rafID.current !== null) {
      cancelAnimationFrame(rafID.current);
      rafID.current = null;
    }
  }, []);

  const startAF = useCallback(() => {
    loop();
  }, [loop]);

  return { startAF, stopAF };
}
