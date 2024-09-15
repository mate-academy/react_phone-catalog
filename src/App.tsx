import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { getFrom } from './api/api';
import { useAppDispatch } from './app/hook';
import { setAccessories } from './features/accessoriesSlice';
import { setTables } from './features/tablesSlice';
import { setPhones } from './features/phoneSlice';
import { setProducts } from './features/productsSlice';

export const App = () => {
  const dispatch = useAppDispatch();

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
        console.log('Error, get products:', error);
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
