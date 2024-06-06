import { Outlet } from 'react-router-dom';
import './main.scss';
import { useContext, useEffect } from 'react';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer/Footer';
import { SidebarContext } from './store/SidebarContext';
import { Sidebar } from './modules/Sidebar';
import { scrollToTop } from './services/scrollToTop';
import { Modal } from './modules/Modal';
import { ModalWindowContext } from './store/ModalWindowContext';
import { ShoppingCartContext } from './store/ShoppingCartContext';

export const App = () => {
  const { isOpenSidebar } = useContext(SidebarContext);
  const { isOpenModal, setIsOpenModal } = useContext(ModalWindowContext);
  const { setShoppingList } = useContext(ShoppingCartContext);

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';
    scrollToTop(false);

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  const applyCheckout = () => {
    setShoppingList([]);
    localStorage.removeItem('CartItem');
    setIsOpenModal(false);
  };

  return (
    <div className="App" style={isOpenModal ? { overflow: 'hidden' } : {}}>
      <Header />

      <div
        className="App__container"
        style={isOpenSidebar ? { height: 'calc(100vh - 48px)' } : {}}
      >
        <div
          className="App__sidebar"
          style={isOpenSidebar ? { right: 0 } : { right: '-100vw' }}
        >
          <Sidebar />
        </div>

        <Outlet />
        <Footer />
      </div>

      {isOpenModal && (
        <Modal
          onCancel={() => setIsOpenModal(false)}
          onConfirm={applyCheckout}
        />
      )}
    </div>
  );
};
