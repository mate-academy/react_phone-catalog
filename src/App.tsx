// import './App.scss';
import './styles/main.scss';
import { Header } from './modules/shared/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/Footer';
import { useContext } from 'react';
import { GlobalContext } from './app/store/GlobalContext';

export const App = () => {
  const { isMenuClose } = useContext(GlobalContext);

  return (
    <div className="App">
      <Header />

      <main className="main">{isMenuClose && <Outlet />}</main>

      <Footer />
    </div>
  );
};
