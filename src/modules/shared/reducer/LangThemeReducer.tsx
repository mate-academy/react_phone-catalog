/* eslint-disable @typescript-eslint/indent */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Lang } from '../Enum/Lang';

type State = {
  theme: 'light' | 'dark';
  lang: Lang;
};

const initUISettings: State = {
  theme: 'light',
  lang: Lang.EN,
};

type Action =
  | { type: 'setTheme'; payload: State['theme'] }
  | { type: 'setLang'; payload: State['lang'] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setTheme':
      return {
        ...state,
        theme: action.payload,
      };
    case 'setLang':
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};

type ScreenContextType = {
  isDesktop: boolean;
  setIsDesktop: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  screenWidth: number;
  setScreenWidth: Dispatch<SetStateAction<number>>;
};
export const ScreenState = createContext<ScreenContextType>({
  isDesktop: true,
  setIsDesktop: () => {},
  isMobile: false,
  setIsMobile: () => {},
  screenWidth: window.innerWidth,
  setScreenWidth: () => {},
});
export const UISettingsState = createContext<State>(initUISettings);
export const UISettingsDispatch = createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalUISettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 670);
  const [settingsState, settingsDispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initUISettings);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsDesktop(window.innerWidth >= 1200);
      setIsMobile(window.innerWidth < 670);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ScreenState.Provider
      value={{
        isDesktop,
        setIsDesktop,
        isMobile,
        setIsMobile,
        screenWidth,
        setScreenWidth,
      }}
    >
      <UISettingsDispatch.Provider value={settingsDispatch}>
        <UISettingsState.Provider value={settingsState}>
          {children}
        </UISettingsState.Provider>
      </UISettingsDispatch.Provider>
    </ScreenState.Provider>
  );
};
