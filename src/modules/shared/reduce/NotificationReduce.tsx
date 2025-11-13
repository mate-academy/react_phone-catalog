import { createContext, useReducer } from 'react';

type State = {
  status: boolean;
  title: string;
  actionResult: 'successfully' | 'alarm' | '';
};

export const initState: State = {
  status: false,
  title: '',
  actionResult: '',
};

type Action =
  | { type: 'addProduct'; payload: string }
  | { type: 'addExistedProduct'; payload: string }
  | { type: 'cancel' };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addProduct':
      return {
        status: true,
        title: action.payload,
        actionResult: 'successfully',
      };
    case 'addExistedProduct':
      return {
        status: true,
        title: action.payload,
        actionResult: 'alarm',
      };
    case 'cancel':
      return {
        status: false,
        title: initState.title,
        actionResult: '',
      };
    default:
      return state;
  }
};

export const NotifStateContext = createContext<State>(initState);

export const NotifDispatchContext = createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalNotifProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifState, notifDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initState,
  );

  return (
    <NotifDispatchContext.Provider value={notifDispatch}>
      <NotifStateContext.Provider value={notifState}>
        {children}
      </NotifStateContext.Provider>
    </NotifDispatchContext.Provider>
  );
};
