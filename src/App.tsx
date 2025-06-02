import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './pages/shared/Header';
import { Menu } from './pages/shared/Menu';
import { useDevice } from './context/DeviceContext';
import { Footer } from './pages/shared/Footer';
import { useEffect } from 'react';

export const App = () => {
  const { isMobile, menuBtn } = useDevice();

  useEffect(() => {
    if (menuBtn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuBtn]);

return (
  <div className="App">
     <h1 className="visually-hidden">Product Catalog</h1>
    <Header />
    {isMobile && menuBtn && <Menu />}
    <Outlet />
    <Footer />
  </div>
) 
}

