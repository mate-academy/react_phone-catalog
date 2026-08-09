import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type PropsDefault = Record<string, string | number | undefined>;

export function useQuery<T extends PropsDefault>(defaults: T) {
  const [params, setParams] = useSearchParams();

  const state = useMemo(() => {
    const result: Record<string, string> = {};

    for (const key in defaults) {
      const getPar = params.get(key);

      result[key] = getPar ?? String(defaults[key] ?? '');
    }

    return result as T;
  }, [params, defaults]);

  const setState = (next: Partial<T>) => {
    const update = new URLSearchParams(params);

    for (const [key, velue] of Object.entries(next)) {
      const def = String(defaults[key as keyof T] ?? '');
      const vel = velue?.toString() ?? def;

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      vel === def || !vel ? update.delete(key) : update.set(key, vel);
    }

    setParams(update, { replace: true });
  };

  return [state, setState] as const;
}
