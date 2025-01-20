import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, HeaderOrigin } from './components/PageTopComponents/Header';
import { Menu } from './components/PageTopComponents/Menu';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { setScreenWidth } from './features/globalSlice';
import { debounce } from 'lodash';
import { Footer } from './components/Footer';
import {
  initDetailedProducts,
  initProducts,
  setCartList,
  setFavoritesList,
} from './features/productSlice';
import {
  getProductsFromStorage,
  LocaleStorageKeys,
  saveProductsToStorage,
} from './app/localeStorage';

export const App = () => {
  const dispatch = useAppDispatch();
  const { favoritesList, cartList } = useAppSelector(st => st.products);

  //#region get items from server
  /* get productList from server. I do this in App because this list
  is needed in several components that are all child of App */
  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initDetailedProducts());
  }, [dispatch]);
  //#endregion

  // recalculate screenWidth everytime it changes
  useEffect(() => {
    const handleResize = debounce(() => {
      dispatch(setScreenWidth(window.innerWidth));
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  //#region work with storage
  useEffect(() => {
    if (localStorage.getItem(LocaleStorageKeys.FAVORITES)) {
      dispatch(
        setFavoritesList(getProductsFromStorage(LocaleStorageKeys.FAVORITES)),
      );
    }

    if (localStorage.getItem(LocaleStorageKeys.CART)) {
      dispatch(setCartList(getProductsFromStorage(LocaleStorageKeys.CART)));
    }
  }, [dispatch]);

  useEffect(() => {
    saveProductsToStorage(LocaleStorageKeys.FAVORITES, favoritesList);
  }, [favoritesList]);

  useEffect(() => {
    saveProductsToStorage(LocaleStorageKeys.CART, cartList);
  }, [cartList]);
  //#endregion

  return (
    <div className="App">
      <Header origin={HeaderOrigin.ONPAGE} />
      <Menu />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
