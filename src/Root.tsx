import { Navigate, Routes, Route } from 'react-router-dom';
import { AppLayout } from './App';
import { HomePapge } from './pages/HomePage';
import { PageProduct } from './pages/PageProduct';
import { Favorite } from './components/Favorite/Favorite';
import { ProductTitle } from './types/ProductTitel';
import { PhoneDetailsPage } from './pages/DetailsPage/PhoneDetailsPage';
import { Orders } from './components/orders/Orders';

export const Root = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<HomePapge />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="phones">
        <Route index element={<PageProduct titel={ProductTitle.phone} />} />
        <Route path=":productId?" element={<PhoneDetailsPage />} />
      </Route>
      <Route path="tablets">
        <Route index element={<PageProduct titel={ProductTitle.tablet} />} />
        <Route path=":productId?" element={<PhoneDetailsPage />} />
      </Route>
      <Route path="accessories">
        <Route
          index
          element={<PageProduct titel={ProductTitle.accessories} />}
        />
        <Route path=":productId?" element={<PhoneDetailsPage />} />
      </Route>
      <Route path="favorits">
        <Route index element={<Favorite />} />
        <Route path=":productId?" element={<PhoneDetailsPage />} />
      </Route>
      <Route path="orders">
        <Route index element={<Orders />} />
        <Route path=":productId?" element={<PhoneDetailsPage />} />
      </Route>

      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);
