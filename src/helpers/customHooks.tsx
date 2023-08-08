import {
  useLayoutEffect,
  useState,
  useEffect,
  useReducer,
} from 'react';
import { State } from '../types/state';
import { Action } from '../types/action';

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export function useLocalStorage(key: string | null, initialValue: string) {
  const [value, setValue] = useState(() => {
    try {
      const item = key ? localStorage.getItem(key) : null;

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (valuer: string | null) => {
    setValue(valuer);
    if (key) {
      localStorage.setItem(key, JSON.stringify(valuer));
    }
  };

  return [value, save];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'UPDATE_PRICE':
      return {
        ...state,
        totalCost: action.payload,
      };
    case 'UPDATE_FAVORITES':
      return {
        ...state,
        favoriteItems: action.payload,
      };
    default:
      return state;
  }
};

export const useLocalStorageReducer = (
  key: string,
  initialValue: State,
): [State, React.Dispatch<Action>] => {
  const storedValue = JSON.parse(
    localStorage.getItem(key)
    || JSON.stringify(initialValue),
  );

  const [state, dispatch] = useReducer(reducer, storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};
