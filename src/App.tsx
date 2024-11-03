import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Phones from "./components/Phones/Phones";
import Tablets from "./components/Tablets/Tablets";
import Cart from "./components/Cart/Cart";
import Accessories from "./components/Accessories/Accessories";
import Favorites from "./components/Favorites/Favorites";
import NoPage from "./components/NoPage/NoPage";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />

      <main className="mx-auto w-page px-6 desktop:px-8">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
