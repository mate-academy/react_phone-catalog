import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CategoryPage } from './modules/CategoryPage';
import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home</h1>} />
            <Route
              path="phones"
              element={<CategoryPage category="phones" title="Mobile phones" />}
            />
            <Route
              path="tablets"
              element={<CategoryPage category="tablets" title="Tablets" />}
            />
            <Route
              path="accessories"
              element={
                <CategoryPage category="accessories" title="Accessories" />
              }
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
