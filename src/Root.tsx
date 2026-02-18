import { FC, StrictMode } from 'react';
import { Provider as AppProvider } from 'react-redux';
import { persistor, store } from './store';
import { AppRouter } from './router';
import { PersistGate } from 'redux-persist/integration/react';

export const Root: FC = () => (
  <StrictMode>
    <AppProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </AppProvider>
  </StrictMode>
);
