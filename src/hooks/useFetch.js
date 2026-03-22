// src/hooks/useFetch.js
import { useEffect, useState, useCallback, useRef } from 'react';
/**
 * useFetch:
 * - source: string URL або async function returning data
 * - deps: dependency array that перезапускає fetch при зміні
 */
export default function useFetch(source, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(source));
  const [error, setError] = useState(null);
  const counterRef = useRef(0);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const callId = ++counterRef.current;

    try {
      let result;

      if (typeof source === 'string') {
        const res = await fetch(source);

        if (!res.ok) {
          throw new Error(`Network error: ${res.status}`);
        }

        result = await res.json();
      } else if (typeof source === 'function') {
        result = await source();
      } else {
        throw new Error('Invalid source for useFetch');
      }

      // ignore stale responses
      if (callId === counterRef.current) {
        setData(result);
      }
    } catch (err) {
      if (callId === counterRef.current) {
        setError(err);
      }
    } finally {
      if (callId === counterRef.current) {
        setLoading(false);
      }
    }
  }, [source, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!source) {
      return;
    }

    load();

    // cleanup: increment counter to ignore inflight responses when unmounted or deps change
    return () => {
      counterRef.current++;
    };
  }, [load]);
  const reload = useCallback(() => {
    // force re-run by bumping counter and calling load
    counterRef.current++;
    load();
  }, [load]);

  return { data, loading, error, reload };
}
