import './styles/main.scss';
import './App.scss';
import Footer from './components/Footer/Footer';
import { NavBar } from './components/Navbar/Navbar';
import Home from './components/Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Favourite from './components/Favourite/Favourite';
import Cart from './components/Cart/Cart';
import Phones from './components/Phones/Phones';
import Tablets from './components/Tablets/Tablets';
import Accessories from './components/Accessories/Accessories';
import NotFound from './components/NotFound/NotFound';
import CardDetails from './components/CardDetails/CardDetails';

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <main className="main-with-fixed-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/phones/:productId" element={<CardDetails />} />
          <Route path="/tablets/:productId" element={<CardDetails />} />
          <Route path="/accessories/:productId" element={<CardDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
