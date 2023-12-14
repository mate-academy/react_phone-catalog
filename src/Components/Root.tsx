import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import { HomePage } from './HomePage/HomePage';
import { Favourites } from './Favourites/Favourites';
import { PhonesPage } from './PhonesPage/PhonesPage';
import { ProductProvider } from '../contexts/ProductContext';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { CartPage } from './CartPage/CartPage';
import { NotReadyPage } from './NotReadyPage/NotReadyPage';
import { store } from '../app/store';

export const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="/phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductDetails />} />
              </Route>
              <Route index path="/tablets" element={<NotReadyPage />} />
              <Route index path="/accessories" element={<NotReadyPage />} />
              <Route path="favourites">
                <Route index element={<Favourites />} />
              </Route>
              <Route path="bag" element={<CartPage />} />
            </Route>
          </Routes>
        </ProductProvider>
      </Provider>
    </BrowserRouter>
  );
};
