import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';

export const App = () => (
  <div className="App">
    <div className="App__header">
      <Header />
    </div>
    <section className="App__main-section">
      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          {/*
          <Route path="phones">
            <Route index element={<PhonesPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessorysPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route
            path="cart"
            element={<CartPage />}
          />

          <Route
            path="favourites"
            element={<FavouritesPage />}
          />

          <Route
            path="*"
            element={<PageNotFound />}
          /> */}
        </Routes>
      </div>
    </section>
    {/* <div className="App__footer">
      <Footer />
    </div> */}
  </div>
);
