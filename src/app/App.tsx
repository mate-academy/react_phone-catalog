import './App.scss';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/footer';
import { GlobalProvider } from '@features/index';

export const App = () => (
  <div className="App">
    <GlobalProvider>
      <Header />
      <Outlet />
    </GlobalProvider>
    <Footer />
  </div>
);
