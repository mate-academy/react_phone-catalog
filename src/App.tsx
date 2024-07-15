import { HeaderNav } from './components/HeaderNav';
import { Home } from './modules/pages/Home/Home';
import cardData from './api/phones.json';
import { createContext } from 'react';
import { Footer } from './components/Footer';
import { Phones } from './modules/pages/Phones/Phones';
import { Routes, Route } from 'react-router-dom';
import { Tablets } from './modules/pages/Tablets';
import tabletsData from './api/tablets.json';
import { Accessories } from './modules/pages/Accessories';
import accessoriesData from './api/accessories.json';
import { Access, Phone } from './modules/pages/types/types';
import { ProductInfo } from './modules/pages/ProductInfo';
import { Favorites } from './modules/pages/Favorites';
import { Bucket } from './modules/pages/Bucket';
import productData from './api/products.json';

export const PhoneContext = createContext(cardData);
export const TabletsContext = createContext(tabletsData);
export const AccessoriesContext = createContext(accessoriesData);
export const ProductsContext = createContext(productData);

export const App: React.FC = () => {
  const phones: Phone[] = cardData;
  const tablets: Phone[] = tabletsData;
  const accessories: Access[] = accessoriesData;
  const products = productData;

  return (
    <ProductsContext.Provider value={products}>
      <AccessoriesContext.Provider value={accessories}>
        <TabletsContext.Provider value={tablets}>
          <PhoneContext.Provider value={phones}>
            <HeaderNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="phones" element={<Phones />}>
                <Route path=":phoneId" element={<ProductInfo />} />
              </Route>
              <Route path="/tablets" element={<Tablets />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/bucket" element={<Bucket />} />
            </Routes>
            <Footer />
          </PhoneContext.Provider>
        </TabletsContext.Provider>
      </AccessoriesContext.Provider>
    </ProductsContext.Provider>
  );
};
