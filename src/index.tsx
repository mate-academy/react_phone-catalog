/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
// eslint-disable-next-line max-len
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductContext';
import { Menu } from './components/Menu';
import { MainContent } from './components/Main/MainContent';
import { Phones } from './components/Phones/Phones';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { Cart } from './components/Cart';
import { Favorites } from './components/Favorites';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { PhonesProvider } from './contexts/PhonesContext';
import { TabletsProvider } from './contexts/TabletsContext';
import { AccessoriesProvider } from './contexts/AccessoriesContext';
import { NotFound } from './components/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './118n';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <FavoritesProvider>
      <CartProvider>
        <PhonesProvider>
          <TabletsProvider>
            <AccessoriesProvider>
              <ProductsProvider>
                <ThemeProvider>
                  <LanguageProvider>
                    <Routes>
                      <Route path="/" element={<App />}>
                        <Route index element={<MainContent />} />
                        <Route path="phones">
                          <Route index element={<Phones />} />
                          <Route
                            path=":productId"
                            element={
                              <ProductDetailsPage key={window.location.hash} category="phones" />
                            }
                          />
                        </Route>

                        <Route path="tablets">
                          <Route index element={<Tablets />} />
                          <Route
                            path=":productId"
                            element={
                              <ProductDetailsPage key={window.location.hash} category="tablets" />
                            }
                          />
                        </Route>

                        <Route path="accessories">
                          <Route index element={<Accessories />} />
                          <Route
                            path=":productId"
                            element={
                              <ProductDetailsPage
                                key={window.location.hash}
                                category="accessories"
                              />
                            }
                          />
                        </Route>
                        <Route path="cart" element={<Cart />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="home" element={<Navigate to="/" replace />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </LanguageProvider>
                </ThemeProvider>
              </ProductsProvider>
            </AccessoriesProvider>
          </TabletsProvider>
        </PhonesProvider>
      </CartProvider>
    </FavoritesProvider>
  </Router>,
);
