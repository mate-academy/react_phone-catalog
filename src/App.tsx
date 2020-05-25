import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { getProducts } from './helpers/api';
import { Logo } from './components/Logo/Logo';
import { Nav } from './components/Nav/Nav';
import { FavoritesIcon } from './components/FavoritesIcon/FavoritesIcon';
import { CartIcon } from './components/CartIcon/CartIcon';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchField } from './components/SeachField/SearchField'
import { LinkType, Product, MyContextType } from './interfaces';
import './App.scss';
import { Route } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/Cart/CartPage';
import { ThanksPage } from './pages/ThanksPage/ThanksPage';

export const MyContext = React.createContext<MyContextType>({} as MyContextType)



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
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem('PhonesCatalog_Cart') || '[]'))

  const [favorites, setFavorites] = useState<Product[]>(
    JSON.parse(localStorage.getItem('PhonesCatalog_Favorites') || '[]'))

  useEffect(() => {
    localStorage.setItem('PhonesCatalog_Cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('PhonesCatalog_Favorites', JSON.stringify(favorites))
  }, [favorites])




  let headerLinks: LinkType[] = [
    { title: 'HOME', address: '/#', isOuter: false },
    { title: 'PHONES', address: '/phones', isOuter: false },
    { title: 'TABLETS', address: '/tablets', isOuter: false },
    { title: 'ACCESSORIES', address: '/accessories', isOuter: false },
  ]
  let footerLinks: LinkType[] = [
    { title: 'GITHUB', address: 'http://www.github.com', isOuter: true },
    { title: 'CONTACTS', address: '/contacts', isOuter: false },
    { title: 'RIGHTS', address: '/rights', isOuter: false },
  ]





  return (
    <MyContext.Provider value={{
      products: products,
      cart: cart,
      setCart: setCart,
      favorites: favorites,
      setFavorites: setFavorites,
    }}>
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
        <Switch>
          {productsFromServer.map(product => {
            let base = '/';
            switch (product.type) {
              case 'phone':
                base = '/phones/';
                break;
              case 'tablet':
                base = '/tablets/';
                break;
              default:
                base = '/accessories/';
            }
            return (
              <Route
                key={product.id}
                path={`${base + product.id}`} >
                <ProductPage product={product} />
              </Route>
            )
          })}



          <Route path="/phones">
            <PhonesPage
              products={products}
            />
          </Route>

          <Route path="/tablets">
            <TabletsPage
              products={products}
            />
          </Route>

          <Route path="/accessories">
            <AccessoriesPage
              products={products}
            />
          </Route>

          <Route path="/favorites">
            <FavoritesPage/>
          </Route>

          <Route path="/cart">
            <CartPage />
          </Route>

          <Route path="/thanks">
            <ThanksPage />
          </Route>

          <Route path="/">
            <HomePage
              products={products}
            />
          </Route>


        </Switch>


      </main >
      <footer className="App__footer">
        <Logo />
        <Nav links={footerLinks} />
        {/* <BackToTop /> */}
      </footer>
    </div>
    </MyContext.Provider>

  );
}

export default App;
