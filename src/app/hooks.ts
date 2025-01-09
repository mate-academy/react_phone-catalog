/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { RefObject, useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// recalculates HTML element width every time window width changes, needed in sliding animation components
export const useWidthRecalculate = (
  /* when you use this hook in component you should create there
  ref for item whose width you'd like to recalculate
  syntax: const [w, setW] = useWidthRecalculate(itemRef) */
  item: RefObject<HTMLElement>,
) => {
  const { screenWidth } = useAppSelector(st => st.global);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (item.current) {
      setItemWidth(item.current.getBoundingClientRect().width);
    }
  }, [screenWidth]);

  // we show TS what item in tuple has which type
  return [itemWidth, setItemWidth] as [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ];
};

// for loading simulation when you change pages
export const useComponentLoading = (delay: number) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return isLoading;
};
