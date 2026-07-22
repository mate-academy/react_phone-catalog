import 'react-loading-skeleton/dist/skeleton.css';
import './i18n';

import './styles/globals.scss';
import './styles/App.scss';
import { Header } from '@shared/components/Header/Header';
import { MobileMenu } from '@shared/components/MobileMenu';
import { Main } from '@shared/components/Main/Main';
import { Footer } from '@shared/components/Footer';
import { Outlet } from 'react-router-dom';
import { RouteScrollReset } from '@shared/components/RouteScrollReset';
import { useMobileMenu } from '@hooks/useMobileMenu';

export const App = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <MobileMenu isOpen={isMenuOpen} />

      <Main>
        <RouteScrollReset />
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};
