import './App.scss';
import type React from 'react';
import { icons } from '../../../global-assets/static';
import { TopBar } from '../TopBar';
import { Footer } from '../Footer';
import { NavAside } from '../NavAside';
import { ProductListProvider } from '../../shared/context/ProductListContext';
import { FavesProvider } from '../../shared/context/FavesContext';
import { GlobalNotifProvider } from '../../shared/reduce/NotificationReduce';
import { GlobalCartListProvider } from '../../shared/reduce/CartReducer';
import { GlobalProductsProvider } from '../../shared/reduce/ProductPageReducer';
import { GlobalProductDetailsProvider } from '../../shared/reduce/SelectedProductReducer';
import { Outlet } from 'react-router-dom';
import { GlobalUISettingsProvider } from '../../shared/reduce/LangThemeReducer';
import { TranslationProvider } from '../../../i18next/shared';

export const App: React.FC = () => {
  return (
    <TranslationProvider>
      <GlobalUISettingsProvider>
        <ProductListProvider>
          <GlobalProductsProvider>
            <GlobalProductDetailsProvider>
              <FavesProvider>
                <GlobalCartListProvider>
                  <GlobalNotifProvider>
                    <div className="app">
                      <div className="app__content">
                        <NavAside />
                        <div className="app__content-top">
                          <TopBar buttonData={icons.menu} />
                          <Outlet />
                        </div>
                      </div>
                      <Footer />
                    </div>
                  </GlobalNotifProvider>
                </GlobalCartListProvider>
              </FavesProvider>
            </GlobalProductDetailsProvider>
          </GlobalProductsProvider>
        </ProductListProvider>
      </GlobalUISettingsProvider>
    </TranslationProvider>
  );
};
