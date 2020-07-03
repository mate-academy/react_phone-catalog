import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { FavContextWrap } from './components/Favourite/FavProductsContext';
import { CartContextWrap } from './components/Cart/CartContext';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { TabletsPage } from './components/ProductPage/TabletsPage';
import { getProducts } from './api/api';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/ProductPage/PhonesPage';
import { FavouritePage } from './components/Favourite/FavouritePage';
import { CartPage } from './components/Cart/CartPage';
import { ProductInfo } from './components/ProductPage/ProductInfo';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  // const { match } = useRouteMatch<any>();

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        // setTablets(data.filter((product: ProductItem) => product.type === 'accessories'));
      });
  }, []);
  // var searchParams = new URLSearchParams();

  return (
    <div className="App">
      <FavContextWrap>
        <CartContextWrap>
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
                  <PhonesPage />
                )}
              />
              <Route
                exact
                path="/tablets"
                render={() => (
                  <TabletsPage />
                )}
              />
              <Route
                path={['/phones/:productId?', '/tablets/:productId?', '/accessories/:productId?']}
                render={({ match }) => {
                  const prod = products.find(item => item.id === match.params.productId);

                  if (prod) {
                    return (
                      <ProductInfo product={prod} id={match.params.productId} />
                    );
                  }

                  return <HomePage products={products} />;
                }}
              />
              <Route path="/favorite" exact component={FavouritePage} />
              <Route path="/cart" exact component={CartPage} />
              <Redirect from="/home" to="/" />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
          <Footer />
        </CartContextWrap>
      </FavContextWrap>
    </div>
  );
};

export default App;
