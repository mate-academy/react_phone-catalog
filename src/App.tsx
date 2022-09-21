import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { getAllDevice } from './api/api';
import { Product } from './type';
import { Phones } from './pages/Phones/Phones';
import { Cart } from './pages/Cart/Cart';
import { Favourites } from './pages/Favourites/Favourites';
import { Basket } from './pages/Basket/Basket';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      let productsFromServer = await getAllDevice();

      productsFromServer = productsFromServer.map((product: Product) => ({
        ...product,
        newPrice: product.price - ((product.price / 100) * product.discount),
      }));

      setProducts(productsFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/phones"
          element={(
            <Phones
              products={products
                .filter(product => product.type === 'phone')}
              title="Mobile phones"
            />
          )}
        />
        <Route
          path="/phones/*"
          element={(
            <Cart products={products
              .filter(product => product.type === 'phone')}
            />
          )}
        />
        <Route
          path="/tablets"
          element={(
            <Phones
              products={products
                .filter(product => product.type === 'tablet')}
              title="Tablets"
            />
          )}
        />
        <Route
          path="/tablets/*"
          element={(
            <Cart products={products
              .filter(product => product.type === 'tablet')}
            />
          )}
        />
        <Route
          path="/accessories/"
          element={(
            <Phones
              products={products
                .filter(product => product.type === 'accessory')}
              title="Accessories"
            />
          )}
        />
        <Route
          path="/accessories/*"
          element={<Cart products={[]} />}
        />
        <Route
          path="/favourites"
          element={<Favourites products={products} />}
        />
        <Route
          path="/cart"
          element={<Basket />}
        />
      </Routes>
    </div>
  );
};

export default App;
