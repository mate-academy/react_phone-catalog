import React, { useEffect, useState } from 'react';
import './App.scss';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { HomePage } from './components/HomePage/HomePage';
import { getProducts } from './api/products';
import { Header } from './components/Header/Header';
import { Route, Redirect, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { Cart } from './components/Cart/Cart';
import { FavoritesPage } from './components/FavoritePage/FavoritePage';
import { ProductDetails } from './components/ProductDetails/ProductDetails';

const App = () => {
const match = useRouteMatch();
const location = useLocation();
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [products, setProducts] = useState([]);
console.log(match)
  useEffect(() => {
    getProducts().then(response => {
      setPhones(response.filter(product => product.type === 'phone'));
      setTablets(response.filter(product => product.type === 'tablet'));
      setProducts(response);
    })
  }, []);

  return (
    <div className="App" >
      <Header />
      <Switch>
        <Route path="/" exact >
          {products.length &&
            <HomePage
              phonesQuantity={phones.length}
              tabletsQuantity={tablets.length}
            />}
          <Footer />
        </Route>
        <Route path="/phones/">
          {phones.length && <PhonesPage phones={phones} />}
          <Footer />
        </Route>
        <Route path="/tablets/">
          {tablets.length && <TabletsPage tablets={tablets} />}
          <Footer />
        </Route>
        <Route path="/cart/">
          {products.length && <Cart products={products}></Cart>}
        </Route>
        <Route path="/favorites/">
          {products.length && <FavoritesPage products={products}></FavoritesPage>}
        </Route>
        <Route path="/mobile phones">
          <Redirect to="/phones/" />
        </Route>
        <Route path="/home/">
          <Redirect to="/" />
        </Route>
        <Route path={["/:id", "/phones/:id", "/tablets/:id", "/cart/:id", "/favorites/:id"]} component={ProductDetails}>
      </Route>
      </Switch>
    </div>
  )
}


export default App;
