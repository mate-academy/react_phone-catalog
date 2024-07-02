import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './modules/shared/Context/Context';
import { Menu } from './modules/Menu';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { Favourites } from './modules/Favourites';
import { Cart } from './modules/Cart';
import { PhoneCard } from './modules/PhoneCard';
import { TabletCard } from './modules/TabletCard';
import { AccessoriesCard } from './modules/AccessoriesCard';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const Root = () => {
  return (
    <HashRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="menu" element={<Menu />} />
            <Route path="phones">
              <Route index element={<Phones />} />
              <Route path=":goodId" element={<PhoneCard />} />
            </Route>
            <Route path="tablets">
              <Route index element={<Tablets />} />
              <Route path=":goodId" element={<TabletCard />} />
            </Route>
            <Route path="accessories">
              <Route index element={<Accessories />} />
              <Route path=":goodId" element={<AccessoriesCard />} />
            </Route>
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ProductProvider>
    </HashRouter>
  );
};
