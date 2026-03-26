import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFoundPage } from './modules/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';
import { useContext, useEffect, useState } from 'react';

import { getProductAll } from './services/api';
import { getPhonesAll } from './services/api';
import { getTabletsAll } from './services/api';
import { getAccessoriesAll } from './services/api';

import { ProductsPage } from './modules/Products Page';
import { ProductPage } from './modules/Product Page';
import { FavouritesContext } from './contexts/FavouritesContext';
import { ShopCart } from './modules/Shop cart';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [tablets, setTablets] = useState<ProductDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductAll()
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        alert('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getPhonesAll()
      .then((ph: ProductDetails[]) => {
        setPhones(ph);
      })
      .catch(() => {
        alert('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getAccessoriesAll()
      .then((acc: ProductDetails[]) => {
        setAccessories(acc);
      })
      .catch(() => {
        alert('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getTabletsAll()
      .then((tab: ProductDetails[]) => {
        setTablets(tab);
      })
      .catch(() => {
        alert('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const phonesForCategory = products.filter(
    product => product.category === 'phones',
  );
  const tabletsForCategory = products.filter(
    product => product.category === 'tablets',
  );
  const accessoriesForCategory = products.filter(
    product => product.category === 'accessories',
  );

  const newestPhones2022 = products.filter(product => product.year === 2022);
  const { fav } = useContext(FavouritesContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<HomePage products={products} loading={loading} />}
        />
        <Route path="phones">
          <Route
            index
            element={
              <ProductsPage
                products={phonesForCategory}
                title="Mobile phones"
                loading={loading}
              />
            }
          />
          <Route
            path=":slug"
            element={
              <ProductPage
                products={phones}
                newestPhones2022={newestPhones2022}
                loading={loading}
                prod={phonesForCategory}
              />
            }
          />
        </Route>
        <Route path="tablets">
          <Route
            index
            element={
              <ProductsPage
                products={tabletsForCategory}
                title="Tablets"
                loading={loading}
              />
            }
          />
          <Route
            path=":slug"
            element={
              <ProductPage
                products={tablets}
                loading={loading}
                prod={tabletsForCategory}
              />
            }
          />
        </Route>
        <Route path="accessories">
          <Route
            index
            element={
              <ProductsPage
                products={accessoriesForCategory}
                title="Accessories"
                loading={loading}
              />
            }
          />
          <Route
            path=":slug"
            element={
              <ProductPage
                products={accessories}
                loading={loading}
                prod={accessoriesForCategory}
              />
            }
          />
        </Route>
        <Route
          path="favourites"
          index
          element={<ProductsPage products={fav} title="Favourites" />}
        />
        <Route path="cart" element={<ShopCart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
