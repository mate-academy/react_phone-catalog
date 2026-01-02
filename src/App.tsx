import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useSidebar } from './hooks/useSidebar';
import { Footer } from './components/Footer';
import { useModal } from './hooks/useModal';
import { SearchModal } from './components/SearchModal';

export const App = () => {
  const { isOpen, handleToggleSidebar } = useSidebar();
  const { isOpen: isOpenSearchWindow, toggleModal, closeModal } = useModal();

  return (
    <div className="App">
      <Header
        isActiveMenu={isOpen}
        toggleMenu={handleToggleSidebar}
        onSearch={toggleModal}
      />
      <Sidebar isActive={isOpen} />
      <main className="main">
        <Outlet />
      </main>

      <Footer />

      <SearchModal isOpen={isOpenSearchWindow} onClose={closeModal} />
    </div>
  );
};
