/* eslint-disable max-len */
import { FiltersProvider } from 'contexts/FiltersContext/FiltersContext';
import { MenuProvider } from 'contexts/MenuContext/MenuContext';
import { ProductsProvider } from 'contexts/ProductsContext/ProductsContext';
import { Main } from 'shared/components/layout/Main';

import { Footer } from './shared/components/layout/Footer/Footer';
import { Header } from './shared/components/layout/Header';

export const App: React.FC = () => (
  <MenuProvider>
    <ProductsProvider>
      <FiltersProvider>
        <div className="App">
          <Header />

          <Main />

          <Footer />
        </div>
      </FiltersProvider>
    </ProductsProvider>
  </MenuProvider>
);
