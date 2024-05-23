import {
  Outlet,
  // useLocation,
} from 'react-router-dom';
import './main.scss';
import { useContext, useEffect } from 'react';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer/Footer';
import { SidebarContext } from './store/SidebarContext';
import { Sidebar } from './modules/Sidebar';
import { scrollToTop } from './services/scrollToTop';

export const App = () => {
  const { isOpenSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';
    scrollToTop(false);

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  return (
    <div className="App">
      <Header />

      <div
        className="App__container"
        style={isOpenSidebar ? { height: 'calc(100vh - 48px)' } : {}}
      >
        <div
          className="App__sidebar"
          style={isOpenSidebar ? { right: 0 } : { right: '-100vw' }}
        >
          <Sidebar />
        </div>

        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
