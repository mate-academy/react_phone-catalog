import { useEffect, useRef, useState } from 'react';
import { Status } from './Status';

const useLoadItems = <T>(loadFn: () => Promise<T | Status>) => {
  const [items, setItems] = useState<T | Status>(Status.LOADING);
  const abortControllerRef = useRef<AbortController | null>(null);

  const load = async () => {
    setItems(Status.LOADING);
    const data = await loadFn();

    setItems(data);
  };

  const loadItems = async () => {
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

        setItems(Status.LOADING);
        const data = await loadFn();

        if (signal.aborted) {
          return;
        }

        await load();

        setItems(data);

        return;
      } catch (e) {
        if (signal.aborted) {
          return;
        }

        if (attempt === 2) {
          setItems(Status.ERROR);
        } else {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { items, loadItems };
};

export { Status, useLoadItems };
