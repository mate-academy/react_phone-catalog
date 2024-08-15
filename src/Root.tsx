import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProducts } from './redux/slices/productsSlice';
import { fetchPhones, selectPhones } from './redux/slices/phonesSlice';
import { fetchTablets, selectTablets } from './redux/slices/tabletsSlice';
import {
  fetchAccessories,
  selectAccessories,
} from './redux/slices/accessoriesSlice';
import { selectUpdatedAt } from './redux/slices/updatedAtSlice';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Favorites } from './components/Favorites';
import { ShoppingCart } from './components/ShoppingCart';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => {
  const { phones, phonesLoading, phonesErrorMsg } =
    useAppSelector(selectPhones);

  const { tablets, tabletsLoading, tabletsErrorMsg } =
    useAppSelector(selectTablets);

  const { accessories, accessoriesLoading, accessoriesErrorMsg } =
    useAppSelector(selectAccessories);

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

          <Route path="/phones">
            <Route
              index
              element={
                <ProductsPage
                  key="Phones"
                  label="Phones"
                  products={phones}
                  loading={phonesLoading}
                  errorMsg={phonesErrorMsg}
                />
              }
            />

            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/tablets">
            <Route
              index
              element={
                <ProductsPage
                  key="Tablets"
                  label="Tablets"
                  products={tablets}
                  loading={tabletsLoading}
                  errorMsg={tabletsErrorMsg}
                />
              }
            />

            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/accessories">
            <Route
              index
              element={
                <ProductsPage
                  key="Accessories"
                  label="Accessories"
                  products={accessories}
                  loading={accessoriesLoading}
                  errorMsg={accessoriesErrorMsg}
                />
              }
            />

            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
