import './App.scss';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/footer';
import { StoreProvider } from '@features/user-store/model/storeContext';
import { GlobalProvider } from './appContext';

export const App = () => (
  <div className="App">
    <GlobalProvider>
      <StoreProvider>
        <Header />
        <Outlet />
        <Footer />
      </StoreProvider>
    </GlobalProvider>
  </div>
);
