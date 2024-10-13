import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { getFrom } from './api/api';
import { useAppDispatch } from './hooks/hookStore';
import { setAccessories } from './features/accessoriesSlice';
import { setTables } from './features/tablesSlice';
import { setPhones } from './features/phoneSlice';
import { setProducts } from './features/productsSlice';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/Themes/ThemeProvider';
import { AppStyled, MainStyled } from './AppStyled';

export const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [phones, tables, accesories, products] = await Promise.all([
          getFrom.getPhones(),
          getFrom.getTables(),
          getFrom.getAccessories(),
          getFrom.getProducts(),
        ]);

        dispatch(setPhones(phones));
        dispatch(setTables(tables));
        dispatch(setAccessories(accesories));
        dispatch(setProducts(products));
      } catch (error) {
        console.error('Error, get products:', error);
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <ThemeProvider>
      <AppStyled className="App">
        <Header />

        <Outlet />

        <MainStyled />

        <div id="modal-root"></div>

        <Footer />
      </AppStyled>
    </ThemeProvider>
  );
};
