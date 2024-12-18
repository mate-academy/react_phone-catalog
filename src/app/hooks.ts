/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { RefObject, useEffect, useState } from 'react';
import { debounce } from 'lodash';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// recalculates HTML element width every time window width changes, needed in sliding animation components
export const useWidthRecalculate = (
  /* when you use this hook in component you should create there
  ref for item and state [width, setWidth] in that component and pass
  those values to this hook */
  item: RefObject<HTMLElement>,
  setItemWidth: (...args: any) => void,
) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (item.current) {
      setItemWidth(item.current.getBoundingClientRect().width);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
