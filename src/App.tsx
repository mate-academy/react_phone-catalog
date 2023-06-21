import { Route, Routes } from 'react-router-dom';
import './base/App.scss';
import { Suspense } from 'react';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader/Loader';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useAppSelector } from './app/hooks';
import { ShoppingCartPage } from './pages/ShoppingCartPage';

const App = () => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className={`App ${theme}`}>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route path="/phones" />
          <Route path="/tablets" />
          <Route path="/accessories" />
          <Route path="/favorites" />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
