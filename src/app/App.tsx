import './App.scss';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/Footer';
import { StoreProvider } from '@features/user-store/model/storeContext';

export const App = () => (
  <div className="App">
    <StoreProvider>
      <Header className={'App__header'} />
      <Outlet />
      <Footer className={'App__footer'} />
    </StoreProvider>
  </div>
);
