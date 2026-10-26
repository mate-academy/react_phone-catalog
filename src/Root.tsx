import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { StoreProvider } from './context/StoreProvider';
import { ScrollToTop } from './components/ScrollTopTop/ScrollToTop';

export const Root = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </HashRouter>
  );
};
