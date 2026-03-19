import { FC, StrictMode } from 'react';
import { Provider as AppProvider } from 'react-redux';
import { persistor, store } from './store';
import { AppRouter } from './router';
import { PersistGate } from 'redux-persist/integration/react';
import { LanguageProvider } from './modules/shared/providers/LanguageProvider';

export const Root: FC = () => (
  <StrictMode>
    <LanguageProvider>
      <AppProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </AppProvider>
    </LanguageProvider>
  </StrictMode>
);
