import './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';

export const App: React.FC = () => {
  return (
    <MenuProvider>
      <div data-cy="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </MenuProvider>
  );
};
