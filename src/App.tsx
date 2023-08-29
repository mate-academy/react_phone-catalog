import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useState } from 'react';

import './styles/App.scss';

import Header from './components/Blocks/Header';
import Home from './components/pages/Home';
import Footer from './components/Blocks/Footer';
import PhonesPage from './components/pages/PhonesPage';
import TabletsPage from './components/pages/TabletsPage';
import AccessoriesPage from './components/pages/AccessoriesPage';
import ProductPage from './components/pages/ProductPage';
import Favorite from './components/pages/Favorite';
import Cart from './components/pages/Cart';
import PageNotFound from './components/pages/PageNotFound';
import { ProductsProvider } from './utils/ProductsContext';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<string>('');

  return (
    <ProductsProvider>
      <Router>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentProduct={currentProduct}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route
            path="/phones"
            element={(
              <PhonesPage
                searchQuery={searchQuery}
                setCurrentProduct={setCurrentProduct}
              />
            )}
          />
          <Route
            path="/tablets"
            element={(
              <TabletsPage
                searchQuery={searchQuery}
                setCurrentProduct={setCurrentProduct}
              />
            )}
          />
          <Route
            path="/accessories"
            element={(
              <AccessoriesPage
                searchQuery={searchQuery}
                setCurrentProduct={setCurrentProduct}
              />
            )}
          />
          <Route path="/phones/:productId" element={<ProductPage />} />
          <Route path="/tablets/:productId" element={<ProductPage />} />
          <Route path="/accessories/:productId" element={<ProductPage />} />
          <Route
            path="/favorites"
            element={(
              <Favorite
                setCurrentProduct={setCurrentProduct}
              />
            )}
          />
          <Route
            path="/cart"
            element={(
              <Cart />
            )}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ProductsProvider>
  );
};

export default App;
