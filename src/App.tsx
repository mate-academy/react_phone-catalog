import { Outlet } from 'react-router-dom';
import './modules/shared/styles/global.scss';
import './modules/shared/styles/icons.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
// eslint-disable-next-line max-len
import { FavouritesProvider } from './modules/shared/contexts/FavouritesContext';

export const App = () => {
  return (
    <FavouritesProvider>
      <div className="app" id="app">
        <Header />
        <div className="app__outlet">
          <Outlet />
        </div>
        <Footer />
      </div>
    </FavouritesProvider>
  );
};
