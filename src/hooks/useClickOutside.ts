import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (
  dropdownRef: RefObject<HTMLElement>,
  param: string,
  setParam: (val: string) => void,
  applyQuery: () => void,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setParam('');
        applyQuery();
      }
    },
    [applyQuery, dropdownRef, setParam],
  );

  useEffect(() => {
    if (param) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [param, dropdownRef, setParam, handleClickOutside]);
};
