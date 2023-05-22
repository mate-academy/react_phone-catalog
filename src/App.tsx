import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { HomePage } from './pages/HomePage';

const menuItems = [
  { to: '/', title: 'home' },
  { to: '/phones', title: 'phones' },
  { to: '/tablets', title: 'tablets' },
  { to: '/accessories', title: 'accessories' },
];

const App = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const toggleMenu = () => {
    setActiveMenu(!isActiveMenu);
  };

  return (
    <div className="App">
      <Header menuItems={menuItems} toggleMenu={toggleMenu} />
      <Menu
        menuItems={menuItems}
        isActiveMenu={isActiveMenu}
        toggleMenu={toggleMenu}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/phones" element={<div>Phones page</div>} />
        <Route path="/tablets" element={<div>Tablets and accessories</div>} />
        <Route path="/favorites" element={<div>Favorites page</div>} />
        <Route path="/cart" element={<div>Cart page</div>} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
