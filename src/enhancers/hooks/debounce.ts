import { useEffect, useRef, useState } from 'react';

type Return<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useDebounce<T>(
  initialState: T,
  callback: (data: T) => void,
  time = 1000,
): Return<T> {
  const [data, setData] = useState<T>(initialState);
  const timerId = useRef(-1);

  useEffect(() => {
    clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      callback(data);
    }, time);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [data, time]);

  return [data, setData];
}
