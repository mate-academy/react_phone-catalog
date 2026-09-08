import { Outlet, useNavigate } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { useEffect } from 'react';
import { UseHooks } from './AppHooks';

export const App = () => {
  const { currentDevice } = UseHooks();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentDevice) {
      navigate(`/${currentDevice.category}/productId=${currentDevice.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice]);

  return (
    <div className="app">
      <Modal />
      <Header />
      <Menu />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
