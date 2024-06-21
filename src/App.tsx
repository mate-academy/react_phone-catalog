import { Header } from './components/Header/Header';
import { AsideMenu } from './components/AsideMenu';
import { Main } from './components/Main/Main';
import { Footer } from './components/Main/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Header />
      <AsideMenu />
      <Main />
      <Footer />
      <Outlet />
    </div>
  );
};
