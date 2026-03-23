// src/hooks/useFetch.ts
import { useEffect, useState, useCallback, useRef } from 'react';
/**
 * useFetch:
 * - source: string URL or async function returning data
 * - deps: dependency array that triggers fetch when changed
 */
export default function useFetch<T>(
  source: string | (() => Promise<T>),
  deps: React.DependencyList = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(source));
  const [error, setError] = useState<Error | null>(null);
  const fetchCallIdRef = useRef<number>(0);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const callId = ++fetchCallIdRef.current;

    try {
      let result: T;

      if (typeof source === 'string') {
        const res = await fetch(source);

        if (!res.ok) {
          throw new Error(`Network error: ${res.status}`);
        }

        result = (await res.json()) as T;
      } else if (typeof source === 'function') {
        result = await source();
      } else {
        throw new Error('Invalid source for useFetch');
      }

      // ignore stale responses
      if (callId === fetchCallIdRef.current) {
        setData(result);
      }
    } catch (err) {
      if (callId === fetchCallIdRef.current) {
        setError(err as Error);
      }
    } finally {
      if (callId === fetchCallIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [source, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!source) {
      return;
    }

    load();

    // cleanup: increment callId to ignore inflight responses when unmounted or deps change
    return () => {
      fetchCallIdRef.current++;
    };
  }, [load]);

  const reload = useCallback(() => {
    // force re-run by bumping callId and calling load
    fetchCallIdRef.current++;
    load();
  }, [load]);

  return { data, isLoading, error, reload };
}
