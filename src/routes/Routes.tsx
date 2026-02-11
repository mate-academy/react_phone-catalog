import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout';
import { CartPageLazy, DetailsPageLazy, FavoritesPageLazy, HomePageLazy, NotFoundPageLazy, ProductPageLazy } from './lazy';
import { ProductName } from '../types/prodName';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';

export const AllRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageLazy />}/>

          <Route path="phones">
            <Route
              index
              element={<ProductPageLazy type={'phones' as ProductName}/>}
            />
            <Route path=":productId" element={<DetailsPageLazy />} />
          </Route>

          <Route path="tablets">
            <Route
              index
              element={<ProductPageLazy type={'tablets' as ProductName}/>}
            />
            <Route path=":productId" element={<DetailsPageLazy />} />
          </Route>

          <Route path="accessories">
            <Route
              index
              element={<ProductPageLazy type={'accessories' as ProductName}/>}
            />
            <Route path=":productId" element={<DetailsPageLazy />} />
          </Route>

          <Route path="favorites" element={<FavoritesPageLazy />} />

          <Route path="cart" element={<CartPageLazy />} />

          <Route path="*" element={<NotFoundPageLazy />} />
        </Route>
      </Routes>
    </Router>
  );
};
