import { createContext, useReducer } from 'react';
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

export const UISettingsState = createContext<State>(initUISettings);

export const UISettingsDispatch = createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalUISettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settingsState, settingsDispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initUISettings);

  return (
    <UISettingsDispatch.Provider value={settingsDispatch}>
      <UISettingsState.Provider value={settingsState}>
        {children}
      </UISettingsState.Provider>
    </UISettingsDispatch.Provider>
  );
};
