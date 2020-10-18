import React, { useEffect, useState } from 'react';
import './App.scss';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { HomePage } from './components/HomePage/HomePage';
import { getProducts } from './api/products';
import { Header } from './components/Header/Header';
import { Route, Redirect } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { Cart } from './components/Cart/Cart';
import { FavoritesPage } from './components/FavoritePage/FavoritePage';

const App = () => {

  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [products, setProducts] = useState([]);

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
      <Route path="/home/">
        {products.length && <HomePage
          phonesQuantity={phones.length}
          tabletsQuantity={tablets.length}
        />}
      </Route>
      <Route path="/phones/">
        {phones.length && <PhonesPage phones={phones} />}
      </Route>
      <Route path="/tablets/">
        {tablets.length && <TabletsPage tablets={tablets} />}
      </Route>
      <Route path="/cart/">
        {products.length && <Cart products={products}></Cart>}
      </Route>
      <Route path="/favorites/">
        {products.length && <FavoritesPage products={products}></FavoritesPage>}
      </Route>
      <Route path="/mobile phones">
        <Redirect to="/phones" />
      </Route>
      <Footer />
    </div>
  )
}


export default App;
