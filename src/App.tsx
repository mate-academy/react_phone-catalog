import React, { useState, useEffect } from 'react';

import { getProducts } from './helpers/api';
import { Logo } from './components/Logo/Logo';
import { Nav } from './components/Nav/Nav';
import { FavoritesIcon } from './components/FavoritesIcon/FavoritesIcon';
import { CartIcon } from './components/CartIcon/CartIcon';
import { HomePage } from './pages/HomePage/HomePage';
import {SearchField} from './components/SeachField/SearchField'



import { Link, Product } from './interfaces';


import './App.scss';
import { Route } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';


const App = () => {
  const [productsFromServer, setProductsFromServer] = useState([] as Product[])
  useEffect(
    () => {
      getProducts().then(products => {
        setProductsFromServer(products)
      });
    }, []
  )



  const products = productsFromServer;

  const [cart, setCart] = useState([] as Product[])
  const [favorites, setFavorites] = useState([] as Product[])



  let headerLinks: Link[] = [
    { title: 'HOME', address: '/', isOuter: false },
    { title: 'PHONES', address: '/phones', isOuter: false },
    { title: 'TABLETS', address: '/tablets', isOuter: false },
    { title: 'ACCESSORIES', address: '/accessories', isOuter: false },
  ]
  let footerLinks: Link[] = [
    { title: 'GITHUB', address: 'http://www.github.com', isOuter: true },
    { title: 'CONTACTS', address: '/contacts', isOuter: false },
    { title: 'RIGHTS', address: '/rights', isOuter: false },
  ]



  return (
    <div className="App">
      <header className="App__header">
        <div className="App__header-wrapper">
          <Nav links={headerLinks} />
          <div className="App__header-right-wrapper">
            <SearchField />
            <FavoritesIcon favorites={favorites} />
            <CartIcon cart={cart} />
          </div>
        </div>

      </header>
      <main className="App__main">
        <switch>
          <Route path="/phones">
           <PhonesPage
              products={products}
              cart={cart}
              favorites={favorites}
              setFavorites={setFavorites}
              setCart={setCart}/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </switch>


      </main >
      <footer className="App__footer">
        <Logo />
        <Nav links={footerLinks} />
        {/* <BackToTop /> */}
      </footer>
    </div>
  );
}

export default App;
