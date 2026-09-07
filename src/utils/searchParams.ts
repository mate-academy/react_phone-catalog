// src/utils/searchParams.ts - Utility for handling URL search parameters
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQueryState<
  T extends Record<string, string | number | undefined>,
>(defaults: T) {
  const [params, setParams] = useSearchParams();

  const state = useMemo(() => {
    const result: Record<string, string> = {};

    for (const [k, v] of Object.entries(defaults)) {
      const pv = params.get(k);

      result[k] = pv ?? String(v ?? '');
    }

    return result as T;
  }, [params, defaults]);

  const setState = (next: Partial<T>) => {
    const updated = new URLSearchParams(params);

    for (const [k, v] of Object.entries(next)) {
      const def = String(defaults[k as keyof T] ?? '');
      const val = v === undefined ? def : String(v);

      if (!val || val === def) {
        updated.delete(k);
      } else {
        updated.set(k, val);
      }
    }

    setParams(updated, { replace: true });
  };

  return [state, setState] as const;
}
