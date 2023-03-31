import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { AccessoriesPage } from './Pages/AccessoriesPage/AccessoriesPage';
import { DetailsPage } from './Pages/DetailsPage/DetailsPage';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';
import { HomePage } from './Pages/HomePage/HomePage';
import { PhonePage } from './Pages/PhonePage/PhonePage';
import { StorePage } from './Pages/StorePage/StorePage';
import { TablePage } from './Pages/TabletsPage/TabletsPage';
import './Style/App.scss';
import { useLocalStorage } from './helpers/utils/useLocaleStorage';

const App: FC = () => {
  const [favoriteProducts, setFavorite] = useLocalStorage('favorite');
  const [selectedProducts, setSelectedProducts] = useLocalStorage('store');

  return (
    <div className="App">
      <Header
        favoriteProductLength={favoriteProducts.length}
        storeCard={selectedProducts.length}
      />
      <Main>
        <Routes>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={(
              <HomePage
                setFavorite={setFavorite}
                favoriteProducts={favoriteProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            )}
          />
          <Route path="/phones">
            <Route
              index
              element={(
                <PhonePage
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
            <Route
              path="/phones/:idProduct"
              element={(
                <DetailsPage
                  type="Phones"
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
          </Route>
          <Route path="/tablets">
            <Route
              index
              element={(
                <TablePage
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
            <Route
              path="/tablets/:idProduct"
              element={(
                <DetailsPage
                  type="Tablets"
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
          </Route>

          <Route path="/accessories">
            <Route
              index
              element={(
                <AccessoriesPage
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
            <Route
              path="/accessories/:idProduct"
              element={(
                <DetailsPage
                  type="Accessories"
                  favoriteProducts={favoriteProducts}
                  setFavorite={setFavorite}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
            />
          </Route>
          <Route
            path="/favorite"
            element={(
              <FavoritesPage
                favoriteProducts={favoriteProducts}
                setFavorite={setFavorite}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            )}
          />
          <Route
            path="/store"
            element={(
              <StorePage
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            )}
          />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
};

export default App;
