import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { getProducts } from './helpers/api';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { Product, MyContextType } from './interfaces';
import './App.scss';
import { Route } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/Cart/CartPage';
import { ThanksPage } from './pages/ThanksPage/ThanksPage';
import { Footer } from './components/Footer/Footer';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

export const MyContext = React.createContext<MyContextType>({} as MyContextType)

const App = () => {
  const [productsFromServer, setProductsFromServer] = useState([] as Product[])
  const [isError, setIsError] = useState(false);
  useEffect(
    () => {
      getProducts().then(products => {
        if (products) {
          setProductsFromServer(products)
        } else {
          setIsError(true)
        }

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

  return (
    <MyContext.Provider value={{
      products: products,
      cart: cart,
      setCart: setCart,
      favorites: favorites,
      setFavorites: setFavorites,
    }}>
      <div className="App">
        <Header />
        {isError
          ? <ErrorPage />
          : (<main className="App__main">
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
                <FavoritesPage />
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
          </main >)}
        <Footer />
      </div>
    </MyContext.Provider>
  );
}

export default App;
