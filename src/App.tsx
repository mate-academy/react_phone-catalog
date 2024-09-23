import { useContext, useEffect } from 'react';
import { Header } from './components/base/Header/Header.component';
import { DispatchContext, StatesContext } from './store/GlobalStateProvider';
import { Outlet } from 'react-router-dom';
import { MenuPage } from './pages/Menu/Menu.page';
import cn from 'classnames';
import { Footer } from './components/base/Footer/Footer.component';
import { getCategories } from './api/products';

export const App = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen, cart } = useContext(StatesContext);

  useEffect(() => {
    dispatch({
      type: 'updateTotalCartItems',
      payload: cart.reduce((acc, prod) => acc + (prod.quantity ?? 1), 0),
    });
  }, [cart]);

  useEffect(() => {
    Promise.allSettled([
      getCategories()
        .then(cats => dispatch({ type: 'loadCategories', payload: cats }))
        .catch(() => 'something wrong while fetching products'),
    ]).finally(() => dispatch({ type: 'isReady', payload: true }));
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1 className="h1Hidden">Product Catalog</h1>
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
