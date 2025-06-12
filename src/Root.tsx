import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './AppProvider';

export const Root = () => (
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
);
