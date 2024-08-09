import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Bay from './components/Page/Bay';
import Categories from './components/Page/Categories';
import Detail from './components/Page/Details';
import Favorites from './components/Page/Favorites';
import Main from './components/Page/Main';
import './scss/App.scss';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/" element={<Main />} />
          <Route path="/phones" element={<Categories />} />
          <Route path="/tablets" element={<Categories />} />
          <Route path="/accessories" element={<Categories />} />
          <Route path="/product/:itemId" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/bay" element={<Bay />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
