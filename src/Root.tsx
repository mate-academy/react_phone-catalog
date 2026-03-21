import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ThemeProvaider } from './context/ThemeContext';
import { HomePage } from './modules/HomePage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => {
  return (
    <ThemeProvaider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvaider>
  );
};
