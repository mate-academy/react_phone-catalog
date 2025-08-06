import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useAppContext } from './contexts/AppContext';

export const App = () => {
  const { isMenuOpen } = useAppContext();
  return (
    <div className="wrapper" style={{ overflow: isMenuOpen ? 'hidden' : 'auto' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
