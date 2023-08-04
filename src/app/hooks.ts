import {
  useCallback,
  useRef,
  useState,
} from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

// eslint-disable-next-line
export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) : (...args: Parameters<T>) => void {
  const timer = useRef<NodeJS.Timeout | undefined>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

export function useLocaleStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (v: T): void => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, save];
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
