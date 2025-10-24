import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadStatus } from './types';

const useLoadItems = <T>(loadFn: () => Promise<T | LoadStatus.ERROR>) => {
  const [items, setItems] = useState<T | LoadStatus>(LoadStatus.LOADING);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadItems = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (signal.aborted) {
          return;
        }

        setItems(LoadStatus.LOADING);
        const data = await loadFn();

        if (signal.aborted) {
          return;
        }

        setItems(data);

        return;
      } catch (e) {
        if (signal.aborted) {
          return;
        }

        if (attempt === 2) {
          setItems(LoadStatus.ERROR);
        } else {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }
  }, [loadFn]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { items, loadItems };
};

export { useLoadItems };
