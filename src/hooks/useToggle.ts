import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

export function useToggle(
  value = false,
): [boolean, Dispatch<SetStateAction<boolean>>, () => void] {
  const [state, setState] = useState(value);

  const toggle = useCallback(() => setState(prev => !prev), []);

  return [state, setState, toggle];
}
