import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';
import { useContext } from 'react';
import { ThemeContext } from './store/ThemeProvider';
import classNames from 'classnames';

export const App = () => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div className={classNames('App', { App_darkTheme: isThemeDark })}>
      <Header />

      <main className="App__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
