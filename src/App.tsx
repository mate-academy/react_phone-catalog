import {
  Outlet,
  // useLocation,
} from 'react-router-dom';
import './main.scss';
import { useContext } from 'react';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer/Footer';
import { SidebarContext } from './store/SidebarContext';
import { Sidebar } from './modules/shared/Sidebar';

export const App = () => {
  const { isOpenSidebar } = useContext(SidebarContext);
  // const { pathname } = useLocation();
  // const openSidebar = pathname === '/menu';

  return (
    <div
      className="App"
      style={isOpenSidebar ? { height: '100vh', overflow: 'hidden' } : {}}
    >
      <Header />

      <div
        className="App__sidebar"
        style={isOpenSidebar ? { right: 0 } : { right: '-100vw' }}
      >
        <Sidebar />
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};
