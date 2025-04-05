import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { BurgerProvider } from './shared/context/BurgerContext';
import { ProductProvider } from './shared/context/ProductsContext';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { ItemCard } from './modules/ItemCard';
import { NotFoundPage } from './modules/NotFoundPage';
import { Favourites } from './modules/Favourites';

export const Root = () => (
  <ProductProvider>
    <BurgerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="phones">
              <Route index element={<Phones />} />
              <Route path=":productId" element={<ItemCard />} />
            </Route>
            <Route path="tablets">
              <Route index element={<Tablets />} />
              <Route path=":productId" element={<ItemCard />} />
            </Route>
            <Route path="accessories">
              <Route index element={<Accessories />} />
              <Route path=":productId" element={<ItemCard />} />/
            </Route>
            <Route path=":productId" element={<ItemCard />} />
            <Route path="favourites">
              <Route index element={<Favourites />} />
              <Route path=":productId" element={<ItemCard />} />/
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BurgerProvider>
  </ProductProvider>
);
