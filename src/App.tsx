import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useAppContext } from './contexts/AppContext';

export const App = () => {
  const { isMenuOpen } = useAppContext();
  return (
    <div style={{ overflow: isMenuOpen ? 'hidden' : 'scroll' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
