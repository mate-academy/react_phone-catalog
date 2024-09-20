import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { ProductsProvider } from './context/ProductsProvider';
import { TabletsProvider } from './context/TabletProvider';
import { AccessoriesProvider } from './context/AccessoriesProvider';
import { PhonesProvider } from './context/PhonesProvider';
import { PhonePage } from './components/PhonePage/PhonePage';
import { ProductDetailsPage } from './components/PDP/ProductDetailsPage';
import { FavoriteCart } from './components/Favorite/FavoriteCart';
import { FavoriteProvider } from './context/FavoriteProvider';
import { ShopingProvider } from './context/ShopingProvider';
import { ShopingCart } from './components/ShopingCart/ShopingCart';
import { Header } from './components/HomePage/Header/Header';

export const App = () => {
  return (
    <div className="App">
      <ProductsProvider>
        <TabletsProvider>
          <AccessoriesProvider>
            <PhonesProvider>
              <ShopingProvider>
                <FavoriteProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/phones"
                      element={<PhonePage filter={'phones'} />}
                    />
                    <Route
                      path="/tablets"
                      element={<PhonePage filter={'tablets'} />}
                    />
                    <Route
                      path="/accessories"
                      element={<PhonePage filter={'accessories'} />}
                    />
                    <Route
                      path="/:category/:itemId"
                      element={<ProductDetailsPage />}
                    />

                    <Route path="/favorite" element={<FavoriteCart />} />
                    <Route path="/shoping" element={<ShopingCart />} />
                    <Route />
                  </Routes>
                </FavoriteProvider>
              </ShopingProvider>
            </PhonesProvider>
          </AccessoriesProvider>
        </TabletsProvider>
      </ProductsProvider>
    </div>
  );
};
