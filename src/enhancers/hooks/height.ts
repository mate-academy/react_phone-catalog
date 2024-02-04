import { useRef } from "react";

type ReturnType<T> = [
  elementReference: React.MutableRefObject<T | null>,
  height: number
];

export function useHeight<T extends HTMLElement>(): ReturnType<T> {
  const ref = useRef<T>(null);
  const height = ref.current?.clientHeight;

  return [ref, height ?? 0];
};