import { useContext, useEffect, useState } from 'react';
import './App.scss';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { TopBar } from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { getAccessories, getPhones, getTablets } from './api';
import { PhonesContext } from './contexts/PhonesContext';
import { TabletContext } from './contexts/TabletsContext';
import { AccessoriesContext } from './contexts/AccessoriesContext';

export const App = () => {
  const { setPhones } = useContext(PhonesContext);
  const { setTablets } = useContext(TabletContext);
  const { setAccessories } = useContext(AccessoriesContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getPhones().then(loadedPhones => setPhones(loadedPhones));
    getTablets().then(loadedTablets => setTablets(loadedTablets));
    getAccessories().then(loadedAccessories =>
      setAccessories(loadedAccessories),
    );
  }, []);

  return (
    <div className="App">
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <TopBar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      <div className="App__outlet">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
