/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { CardsContextProvider } from './context/CardsContext/provider/CardsContextProvider';
import { CartContextProvider } from './context/CartContext/provider';
import { DSContextProvider } from './context/DSContext/provider';
import { FavouritesContextProvider } from './context/FavouritesContext/provider';
import { MainContextProvider } from './context/MainContext/provider';
import { ProductsContextProvider } from './context/ProductsContext/provider';
import { SearchContextProvider } from './context/SearchContext/provider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <SearchContextProvider>
      <MainContextProvider>
        <DSContextProvider>
          <ProductsContextProvider>
            <CardsContextProvider>
              <FavouritesContextProvider>
                <CartContextProvider>
                  <App />
                </CartContextProvider>
              </FavouritesContextProvider>
            </CardsContextProvider>
          </ProductsContextProvider>
        </DSContextProvider>
      </MainContextProvider>
    </SearchContextProvider>
  </BrowserRouter>,
);
