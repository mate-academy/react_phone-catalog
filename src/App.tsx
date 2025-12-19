import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useSidebar } from './hooks/useSidebar';
import { Footer } from './components/Footer';

export const App = () => {
  const { isOpen, handleToggleSidebar } = useSidebar();

  return (
    <div className="App">
      <Header isActiveMenu={isOpen} toggleMenu={handleToggleSidebar} />
      <Sidebar isActive={isOpen} />
      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
