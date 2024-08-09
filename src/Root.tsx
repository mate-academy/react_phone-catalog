import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProducts } from './redux/slices/productsSlice';
import { fetchPhones } from './redux/slices/phonesSlice';
import { fetchTablets } from './redux/slices/tabletsSlice';
import { fetchAccessories } from './redux/slices/accessoriesSlice';
import { selectUpdatedAt } from './redux/slices/updatedAtSlice';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { Favorites } from './components/Favorites';
import { ShoppingCart } from './components/ShoppingCart';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => {
  const updatedAt = useAppSelector(selectUpdatedAt);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPhones());
    dispatch(fetchTablets());
    dispatch(fetchAccessories());
  }, [dispatch, updatedAt]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
