import './App.scss';
import './utils/font-styles.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from './Store/Store';

export const App = () => {
  const { isMenuVisible } = useContext(StateContext);

  return (
    <div className="App">
      <Header />
      {isMenuVisible ? (
        <Menu />
      ) : (
        <>
          <main className="main">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
