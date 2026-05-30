import { useContext, useEffect } from 'react';
import {
  DispatchContext,
  StatesContext,
} from './base/store/GlobalStateProvider';
import { Header } from './base/Header/Header';
import { MenuPage } from './pages/Menu/Menu';
import { Outlet } from 'react-router-dom';
import { Footer } from './base/Footer/Footer';
import cn from 'classnames';

export const App = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen, cart } = useContext(StatesContext);

  // NOVO: Inicializa o app como "pronto"
  useEffect(() => {
    dispatch({ type: 'isReady', payload: true });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: 'updateTotalCartItems',
      payload: cart.reduce((acc, prod) => acc + (prod.quantity ?? 1), 0),
    });
  }, [cart, dispatch]);

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <aside className={cn('menu', { 'menu-isOpen': isMenuOpen })} id="menu">
        <MenuPage />
      </aside>
      <Outlet />

      <Footer />
    </div>
  );
};
