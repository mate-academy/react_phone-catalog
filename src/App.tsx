import { Outlet } from 'react-router-dom';
import './modules/shared/styles/global.scss';
import './modules/shared/styles/icons.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App = () => {
  return (
    <div className="app" id="app">
      <Header />
      <div className="app__outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
