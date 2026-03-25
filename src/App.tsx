import './App.scss';
import Home from './pages/homePage/Home';
import Phones from './pages/phonesPage/Phones';
import Accessories from './pages/Accessories';
import Tablets from './pages/tabletsPage/Tablets';
import Heart from './pages/heartPage/Heart';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';

export const App = () => {
  return (
    <HashRouter>
      <div className="App">

      </div>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/heart" element={<Heart />} />
      </Routes>
    </HashRouter>
  );
};
