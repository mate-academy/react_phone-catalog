import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';
import { MenuProvider } from './hooks/useMenu';
import { Footer } from './components/Footer';
import { useErrorHandling } from './hooks/errorHandling';
import { Error } from './components/Error';

export const App = () => {
  const { isError } = useErrorHandling();

  return (
    <div className="app">
      <MenuProvider>
        <div className="app__header">
          <Header />
        </div>
        <Menu />
      </MenuProvider>
      <div className="app__main">{isError ? <Error /> : <Outlet />}</div>
      <Footer />
    </div>
  );
};
