import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './styles/index.scss';
import { ShopProvider } from './context/ShopContext/ShopContext';
import { ProductProvider } from './context/ShopContext/ProductContext';
import { FavouriteProvider } from './context/ShopContext/FavoutiteContext';
import { ShopDataProvider } from './context/ShopContext/ShopDataContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductProvider>
      <ShopDataProvider>
        <FavouriteProvider>
          <ShopProvider>
            <App />
          </ShopProvider>
        </FavouriteProvider>
      </ShopDataProvider>
    </ProductProvider>
  </HashRouter>,
);
