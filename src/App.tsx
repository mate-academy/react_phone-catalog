import '@/global.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { HomePage } from '@/modules/HomePage';
import { Phones } from '@/modules/Phones';
import { Tablets } from '@/modules/Tablets';
import { Accessories } from '@/modules/Accessories';
import { PhoneDetailsWrapper } from '@/components/PhoneDetailsWrapper';
import { NotFoundPage } from '@/components/NotFoundPage';
import { ScrollToTop } from '@/utils/ScrollToTop';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Favourties } from './components/Favourites';
import { Cart } from './components/Cart';
const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<Phones />} />
            <Route path="phones/:slug" element={<PhoneDetailsWrapper />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path='accessories' element={<Accessories />} />
            <Route path="favourites" element={<Favourties />} />
            <Route path="cart" element={<Cart />} />

          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
