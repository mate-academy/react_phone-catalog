import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { SidebarProvider } from './store/SidebarContext';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductPage } from './modules/ProductPage';
import { WindowWidthProvider } from './store/WindowWidthContext';
import { Reload } from './modules/shared/Reload';
import { ShoppingCart } from './modules/ShoppingCart';
import { ShoppingCartProvider } from './store/ShoppingCartContext';
import { ModalWindowProvider } from './store/ModalWindowContext';
import { Favourites } from './modules/Favourites';
import { FavouritesProvider } from './store/FavouritesContext';

export const Root = () => (
  <Router>
    <WindowWidthProvider>
      <ShoppingCartProvider>
        <FavouritesProvider>
          <ModalWindowProvider>
            <SidebarProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<HomePage />} />
                  <Route path="home" element={<Navigate to="/" replace />} />

                  <Route path="phones">
                    <Route
                      index
                      element={<CategoryPage title="Mobile phones" />}
                    />
                    <Route path=":itemId" element={<ProductPage />} />
                  </Route>

                  <Route path="tablets">
                    <Route index element={<CategoryPage title="Tablets" />} />
                    <Route path=":itemId" element={<ProductPage />} />
                  </Route>

                  <Route path="accessories">
                    <Route
                      index
                      element={<CategoryPage title="Accessories" />}
                    />
                    <Route path=":itemId" element={<ProductPage />} />
                  </Route>

                  <Route path="shopping-cart" element={<ShoppingCart />} />

                  <Route path="favourites" element={<Favourites />} />

                  <Route
                    path="*"
                    element={<Reload imgOfError="page-not-found.png" />}
                  />
                </Route>
              </Routes>
            </SidebarProvider>
          </ModalWindowProvider>
        </FavouritesProvider>
      </ShoppingCartProvider>
    </WindowWidthProvider>
  </Router>
);
