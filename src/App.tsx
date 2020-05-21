import React, {useState, useEffect}from 'react';

import { getProducts } from './helpers/api';
import { Logo } from './components/Logo/Logo';
import { Nav } from './components/Nav/Nav';
import { FavoritesIcon } from './components/FavoritesIcon/FavoritesIcon';
import { CartIcon } from './components/CartIcon/cart_icon';
import { HomePage } from './pages/HomePage/HomePage';
import { Catalog } from './pages/Catalog/Catalog';



import { Link, Product } from './interfaces';


import './App.scss';
import { Route } from 'react-router-dom';


const App = () => {
  const [productsFromServer, setProductsFromServer] = useState([] as Product[])
  // const [phones, setPhones] = useState([] as Product[])
  // const [tablets, setTablets] = useState([] as Product[])
useEffect (
  () => {
    getProducts().then(products => {
      setProductsFromServer(products)});
  }, []
)
// useEffect (
//   () => {
//       setPhones(productsFromServer.filter(product => (product.type === 'phone')));
//       setTablets(productsFromServer.filter(product => (product.type === 'tablet')));
//     }
//   , [productsFromServer]
// )


  const visibleProducts = productsFromServer;






  let headerLinks: Link[] = [
    { title: 'HOME', address: '/', isOuter: false },
    { title: 'PHONES', address: '/catalog', isOuter: false },
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
        <Logo />
        <Nav links={headerLinks} />
        <FavoritesIcon />
        <CartIcon />

      </header>
      <main className="main">
        <switch>
          <Route path="/catalog">
            <Catalog visibleProducts={visibleProducts}/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </switch>


      </main>
      <footer className="footer">
        <Logo />
        <Nav links={footerLinks} />
        {/* <BackToTop /> */}
      </footer>
    </div>
  );
}

export default App;
