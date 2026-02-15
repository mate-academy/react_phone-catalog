import './Layout.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useState } from 'react';
import { Menu } from '../Menu';
import classNames from 'classnames';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="wrapper menu-wrapper">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMobile && isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}

      <div
        className={classNames('layout__content', {
          'hidden-when-menu': isMenuOpen && isMobile,
        })}
      >
        <main className="main page__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
