import { useContext, useEffect } from 'react';
import { Header } from './components/base/Header/Header.component';
import { DispatchContext, StatesContext } from './store/GlobalStateProvider';
import { Outlet } from 'react-router-dom';
import { MenuPage } from './pages/Menu/Menu.page';
import cn from 'classnames';
import { getCategories, getProducts } from './api/products';
import { Footer } from './components/base/Footer/Footer.component';

export const App = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);

  useEffect(() => {
    Promise.allSettled([
      getProducts().then(productsFromServer => {
        dispatch({ type: 'loadProducts', payload: productsFromServer });
      }),
      getCategories().then(categories => {
        dispatch({ type: 'loadCategories', payload: categories });
      }),
    ]).finally(() => {
      dispatch({ type: 'isReady', payload: true });
    });
  }, [dispatch]);

  return (
    <div className="App" id="top">
      {/* <h1>Product Catalog</h1> */}
      <Header />
      <aside className={cn('menu', { 'menu-isOpen': isMenuOpen })} id="menu">
        <MenuPage />
      </aside>
      <Outlet />
      <Footer />
    </div>
  );
};
