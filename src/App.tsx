import { HeaderNav } from './components/HeaderNav';
import { Home } from './modules/pages/Home/Home';
import { Footer } from './components/Footer';
import { Phones } from './modules/pages/Phones/Phones';
import { Routes, Route } from 'react-router-dom';
import { Tablets } from './modules/pages/Tablets';
import { Accessories } from './modules/pages/Accessories';
import { ProductInfo } from './modules/pages/ProductInfo';
import { Favorites } from './modules/pages/Favorites';
import { Bucket } from './modules/pages/Bucket';
import { PageProvider } from './PageContext';
import { PageNotFound } from './components/PageNotFound';
import { AsideMenu } from './components/AsideMenu';

export const App: React.FC = () => {
  return (
    <PageProvider>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones">
          <Route index element={<Phones />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="/tablets">
          <Route index element={<Tablets />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="/accessories">
          <Route index element={<Accessories />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/bucket" element={<Bucket />} />
        <Route path="/menu" element={<AsideMenu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </PageProvider>
  );
};
