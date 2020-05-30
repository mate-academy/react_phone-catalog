import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { PhonesPage } from './components/PhonesPage';
import { getProducts } from './api/api';
import { HomePage } from './components/HomePage';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [phones, setPhones] = useState<ProductItem[]>([]);
  const [tablets, setTablets] = useState<ProductItem[]>([]);
  const [accessories] = useState<ProductItem[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setPhones(data.filter((product: ProductItem) => product.type === 'phones'));
        setTablets(data.filter((product: ProductItem) => product.type === 'tablet'));
      });
  }, []);
  console.log(`products`);
  console.log(products);
  console.log(`phones`);
  console.log(phones);
  console.log(`tablets`);
  console.log(tablets);
  console.log(accessories);
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage products={products} />
            )}
          />
          <Route
            exact
            path="/phones"
            render={() => (
              <PhonesPage products={products} />
            )}
          />
          <Redirect from="/home" to="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};


export default App;
