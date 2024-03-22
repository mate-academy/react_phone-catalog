import { Outlet, useLocation } from 'react-router-dom';
import './main.scss';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer/Footer';

export const App = () => {
  const { pathname } = useLocation();
  const openSidebar = pathname === '/menu';

  return (
    <>
      <div className="App">
        <Header />
        <Outlet />
        {!openSidebar && <Footer />}
      </div>
    </>
  );
};
