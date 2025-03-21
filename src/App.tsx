import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './Components/Navigation';
import { Menu } from './Components/Menu';
import { Home } from './Components/Home';
import { Footer } from './Components/Footer';
import { NotFoundPage } from './Components/NotFoundPage';
import { ProductCatalog } from './Components/ProductCatalog';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './Components/Loader';
import { fetchAccessoriesWithYear } from './Components/features/accessories';
import { fetchTabletsWithYear } from './Components/features/tablets';
import { fetchPhonesWithYear } from './Components/features/phones';
import { ProductDetails } from './Components/ProductDetails';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    phones,
    loading: phonesLoading,
    error: phonesError,
  } = useAppSelector(state => state.phones);
  const {
    tablets,
    loading: tabletsLoading,
    error: tabletsError,
  } = useAppSelector(state => state.tablets);
  const {
    accessories,
    loading: accessoriesLoading,
    error: accessoriesError,
  } = useAppSelector(state => state.accessories);

  useEffect(() => {
    dispatch(fetchPhonesWithYear());
    dispatch(fetchTabletsWithYear());
    dispatch(fetchAccessoriesWithYear());
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/phones"
              element={
                phonesLoading ? (
                  <Loader />
                ) : phonesError ? (
                  phonesError
                ) : phones ? (
                  <ProductCatalog title={'Mobile Phones'} items={phones} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />

            <Route
              path="/phones/:productId"
              element={
                phonesLoading ? (
                  <Loader />
                ) : phonesError ? (
                  phonesError
                ) : phones ? (
                  <ProductDetails items={phones} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />
            <Route
              path="/tablets"
              element={
                tabletsLoading ? (
                  <Loader />
                ) : tabletsError ? (
                  tabletsError
                ) : tablets ? (
                  <ProductCatalog title={'Tablets'} items={tablets} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />

            <Route
              path="/tablets/:productId"
              element={
                tabletsLoading ? (
                  <Loader />
                ) : tabletsError ? (
                  tabletsError
                ) : tablets ? (
                  <ProductDetails items={tablets} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />
            <Route
              path="/accessories"
              element={
                accessoriesLoading ? (
                  <Loader />
                ) : accessoriesError ? (
                  accessoriesError
                ) : accessories ? (
                  <ProductCatalog title={'Accessories'} items={accessories} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />

            <Route
              path="/accessories/:productId"
              element={
                accessoriesLoading ? (
                  <Loader />
                ) : accessoriesError ? (
                  accessoriesError
                ) : accessories ? (
                  <ProductDetails items={accessories} />
                ) : (
                  <p>Something went wrong</p>
                )
              }
            />
            <Route
              path="/favourites"
              element={
                <>
                  <h1 className="title">favourites Page</h1>
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <h1 className="title">shopping Page</h1>
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {<Menu />}
      </main>

      <Footer />
    </div>
  );
};
