import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : initialValue;
  });

  const setData = (v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, setData];
};
