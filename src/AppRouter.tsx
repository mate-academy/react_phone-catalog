import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ProviderBurgerMenu } from './store/ProviderBurgerMenu';
import { NotFoundPages } from './components/NotFoundPages';
import { HomePage } from './modules/HomePage';
import { ProviderProduct } from './store/ProviderProduct';
import { PhoneCatalog } from './modules/PhoneCatalog';
import { TabletsCatalog } from './modules/TabletsCatalog';
import { AccessoriesCataloge } from './modules/AccessoriesCataloge/AccessoriesCataloge';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProviderDetailContext } from './store/ProviderProductDetails';
import { Favorites } from './modules/Favorites';
import { ProviderFavorite } from './store/ProviderFavorite';
import { Cart } from './modules/Cart';
import { ProviderCart } from './store/ProviderCart';
import { ProviderTheme } from './store/ProviderTheme';

export const AppRouter = () => (
  <HashRouter>
    <ProviderTheme>
      <ProviderBurgerMenu>
        <ProviderCart>
          <ProviderFavorite>
            <ProviderProduct>
              <ProviderDetailContext>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />

                    <Route path="favorites" element={<Favorites />} />

                    <Route path="cart" element={<Cart />} />

                    <Route path="phones" element={<PhoneCatalog />} />
                    <Route
                      path="phones/:productId"
                      element={<ProductDetailsPage />}
                    />

                    <Route path="tablets" element={<TabletsCatalog />} />
                    <Route
                      path="tablets/:productId"
                      element={<ProductDetailsPage />}
                    />

                    <Route
                      path="accessories"
                      element={<AccessoriesCataloge />}
                    />
                    <Route
                      path="accessories/:productId"
                      element={<ProductDetailsPage />}
                    />

                    <Route path="*" element={<NotFoundPages />} />
                  </Route>
                </Routes>
              </ProviderDetailContext>
            </ProviderProduct>
          </ProviderFavorite>
        </ProviderCart>
      </ProviderBurgerMenu>
    </ProviderTheme>
  </HashRouter>
);
