import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Layout } from './components/Layout';
import { HomePage } from './modules/HomePage';
import { ProductsProvider } from './store/ProductsContext';
import './index.scss';
import { ProductPages } from './modules/ProductPages';
import { categories } from './data/categories';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './store/CartContext';
import { FavouritesPage } from './modules/FavouritesPage';
import { FavouritesProvider } from './store/FavouritesContext';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <ProductsProvider>
        <CartProvider>
          <FavouritesProvider>
            <div className="page">
              <Layout>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    {categories.map(category => (
                      <Route
                        key={category.name}
                        path={`/${category.name}`}
                        element={<ProductPages category={category} />}
                      />
                    ))}

                    <Route
                      path={`/product/:productId`}
                      element={<ProductDetailsPage />}
                    />
                  </Route>
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favourites" element={<FavouritesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </div>
          </FavouritesProvider>
        </CartProvider>
      </ProductsProvider>
    </Router>
  );
};
