import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { useDisclosure } from './hooks/useDisclosure';
import { Search } from './modules/Search';

export const App = () => {
  const {
    isOpen: isSidebarOpen,
    toggle: toggleSidebar,
    close: closeSidebar,
  } = useDisclosure(false, {
    closeOnLocationChange: true,
    lockScroll: true,
  });

  const {
    isOpen: isSearchOpen,
    toggle: toggleSearch,
    close: closeSearch,
  } = useDisclosure(false, {
    lockScroll: true,
    closeOnLocationChange: true,
  });

  return (
    <div className="App">
      <Header
        isActiveMenu={isSidebarOpen}
        toggleMenu={toggleSidebar}
        onSearch={toggleSearch}
        closeMenu={closeSidebar}
      />
      <Sidebar isActive={isSidebarOpen} />
      <main className="main">
        <Outlet />
      </main>

      <Footer />

      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
};
