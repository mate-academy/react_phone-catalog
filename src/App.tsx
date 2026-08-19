import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";
import CategoryPage from "./pages/categoryPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import { CategoryType } from "./enums/CategoryType";
import './index.scss';
import ProductDetails from "./shared/ProductDetails";
import FavouritesPage from "./pages/favouritesPage";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div>
      <Header />

      <main>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route
              path="/phones"
              element={<CategoryPage category={CategoryType.Phones} />}
            />
            <Route
              path="/tablets"
              element={<CategoryPage category={CategoryType.Tablets} />}
            />
            <Route
              path="/accessories"
              element={<CategoryPage category={CategoryType.Accessories} />}
            />

            <Route
              path="/:category/:productId" element={<ProductDetails />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
