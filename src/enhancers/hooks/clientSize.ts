import { useRef } from 'react';

type ReturnType<T> = [
  elementReference: React.MutableRefObject<T | null>,
  height: number,
  width: number,
];

export function useClientSize<T extends HTMLElement>(): ReturnType<T> {
  const ref = useRef<T>(null);
  const height = ref.current?.clientHeight;
  const width = ref.current?.clientWidth;

  return [ref, height ?? 0, width ?? 0];
}
