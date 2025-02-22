/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DSContextProvider } from './context/DSContext/provider';
import { MainContextProvider } from './context/MainContext/provider';
import { ProductsContextProvider } from './context/ProductsContext/provider';
import { SearchContextProvider } from './context/SearchContext/provider';
import { CardsContextProvider } from './context/CardsContext/provider/CardsContextProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <SearchContextProvider>
      <MainContextProvider>
        <DSContextProvider>
          <ProductsContextProvider>
            <CardsContextProvider>
              <App />
            </CardsContextProvider>
          </ProductsContextProvider>
        </DSContextProvider>
      </MainContextProvider>
    </SearchContextProvider>
  </BrowserRouter>,
);
