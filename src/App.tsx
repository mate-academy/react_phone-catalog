import { useContext, useEffect } from 'react';
import { Header } from './components/base/Header/Header.component';
import { DispatchContext, StatesContext } from './store/GlobalStateProvider';
import { AccessorySpecs } from './types/AccessorySpecs';
import { PhoneSpecs } from './types/PhoneSpecs';
import { TabletSpecs } from './types/TabletSpecs';
import { Outlet } from 'react-router-dom';
import { MenuPage } from './pages/Menu/Menu.page';
import cn from 'classnames';
import { getProducts } from './api/products';

export const App = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);
  // #region accessories

  useEffect(() => {
    getProducts<AccessorySpecs[]>(
      'http://localhost:3000/api/accessories.json',
    ).then(accessoriesFromServer => {
      dispatch({ type: 'loadAccessories', payload: accessoriesFromServer });
    });
  }, []);
  // #endregion
  // #region phones

  useEffect(() => {
    getProducts<PhoneSpecs[]>('http://localhost:3000/api/phones.json').then(
      phonesFromServer => {
        dispatch({ type: 'loadPhones', payload: phonesFromServer });
      },
    );
  }, []);
  // #endregion
  // #region tablets

  useEffect(() => {
    getProducts<TabletSpecs[]>('http://localhost:3000/api/tablets.json').then(
      tabletsFromServer => {
        dispatch({ type: 'loadTablets', payload: tabletsFromServer });
      },
    );
  }, []);
  // #endregion

  return (
    <div className="App" id="top">
      {/* <h1>Product Catalog</h1> */}
      <Header />
      <aside className={cn('menu', { 'menu-isOpen': isMenuOpen })} id="menu">
        <MenuPage />
      </aside>
      <Outlet />
    </div>
  );
};
