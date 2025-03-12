import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { BurgerProvider } from './shared/context/BurgerContext';
import { ProductProvider } from './shared/context/ProductsContext';

export const Root = () => (
  <ProductProvider>
    <BurgerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </BurgerProvider>
  </ProductProvider>
);
