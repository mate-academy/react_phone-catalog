/* eslint-disable import/no-extraneous-dependencies */
import { ReactNode } from 'react';
import { createReduxStore } from '../config/store';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
