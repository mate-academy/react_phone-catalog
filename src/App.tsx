import { Navigate, Route, Routes } from 'react-router-dom';
import './utils/_fonts.scss';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductDetailsPage } from './modules/CategoryPage/ProductDetailsPage';
import { ProductsProvider } from './context/ProductsContext';
import { FilterProvider } from './context/FilterContext';

export const App = () => {
  return (
    <ProductsProvider>
      <FilterProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route
              path="/phones"
              element={<CategoryPage category="phones" title="Mobile phones" />}
            />

            <Route
              path="/tablets"
              element={<CategoryPage category="tablets" title="Tablets" />}
            />

            <Route
              path="/accessories"
              element={
                <CategoryPage category="accessories" title="Accessories" />
              }
            />

            <Route
              path="/:category/product/:productId"
              element={<ProductDetailsPage />}
            />

            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </FilterProvider>
    </ProductsProvider>
  );
};
