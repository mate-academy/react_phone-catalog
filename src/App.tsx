import { Outlet } from 'react-router-dom';
import { Footer } from './pages/Footer/Footer';
import { Header } from './pages/Header/Header';
import './App.scss';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const rootClass = `App-wrapper App-wrapper__theme-${theme}`;
  const appGround = `App App--theme-${theme}`;

  return (
    <div className={rootClass}>
      <Header />
      <div className={appGround}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
