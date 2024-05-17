import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CatalogProvider } from './pages/CatalogContext';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProductDetails } from './pages/ProductDetailsPage/ProductDetailsPage';
import { store } from './app/store';

export const Root = () => {
  const prodCategories = ['phones', 'tablets', 'accessories'];

  return (
    <Provider store={store}>
      <CatalogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              {prodCategories.map((category, index) => {
                return (
                  <Route path={`/${category}`} key={category}>
                    <Route index element={<ProductPage title={category} />} />
                    <Route
                    }/> 
                      element={<ProductDetails index={index} />}
                    />
                  </Route>
                );
              })
              })}
              <Route path="/favorites"></Route>
              <Route path="/cart"></Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CatalogProvider>
    </Provider>
  );
};
