import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type State = {
  isMenuOpen: boolean;
};

type Action = { type: 'TOGGLE_MENU' } | { type: 'CLOSE_MENU' };

const initialState: State = {
  isMenuOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };

    case 'CLOSE_MENU':
      if (!state.isMenuOpen) {
        return state;
      }

      return { ...state, isMenuOpen: false };

    default:
      return state;
  }
};

const MenuStateContext = createContext<State>(initialState);
const MenuDispatchContext = createContext<Dispatch<Action>>(() => {});

type MenuProviderProps = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isMenuOpen]);

  return (
    <MenuStateContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuStateContext.Provider>
  );
};

export const useMenu = () => useContext(MenuStateContext);
export const useMenuDispatch = () => useContext(MenuDispatchContext);
