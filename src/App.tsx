import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import { DataContext } from './context/DataContext';

export const App = () => {
  const { isMenuOpen } = useContext(DataContext);

  return (
    <div className="App">
      <h1 hidden>Product Catalog</h1>
      <Navbar />

      {!isMenuOpen && (
        <main className="main">
          <Outlet />
        </main>
      )}

      {!isMenuOpen && <Footer />}
    </div>
  );
};
