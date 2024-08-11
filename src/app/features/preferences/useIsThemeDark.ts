import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectIsThemeDark } from './selectors';
import { setIsThemeDark, themeManager } from './preferencesSlice';
import { useEffect } from 'react';

const THEME_ATTRIBUTE_NAME = 'data-is-dark';

export const useIsThemeDark = (): [boolean, () => void] => {
  const isThemeDark = useAppSelector(selectIsThemeDark);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isThemeDark) {
      document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, '');
    } else {
      document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
    }
  }, [isThemeDark]);

  const toggleIsThemeDark = () => {
    const newIsThemeDark = !isThemeDark;

    dispatch(setIsThemeDark(newIsThemeDark));
    themeManager.set(newIsThemeDark);
  };

  return [isThemeDark, toggleIsThemeDark];
};
