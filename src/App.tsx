import {
  Outlet,
  // useLocation,
} from 'react-router-dom';
import './main.scss';
// import { useState } from 'react';
import { useContext } from 'react';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer/Footer';
import { SidebarContext } from './store/SidebarContext';

export const App = () => {
  const { isOpenSidebar } = useContext(SidebarContext);
  // const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  // const { pathname } = useLocation();
  // const openSidebar = pathname === '/menu';

  return (
    <>
      <div
        className="App"
        style={isOpenSidebar ? { height: '100vh', overflow: 'hidden' } : {}}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
