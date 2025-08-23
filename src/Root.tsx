import { HomePage } from './modules/HomePage';
import { App } from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './modules/ProductPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductPage />} />
          <Route path="tablets" element={<ProductPage />} />
          <Route path="accessories" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
