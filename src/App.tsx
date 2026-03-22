import './App.scss';
import Home from './pages/homePage/Home';
import Phones from './pages/phonesPage/Phones';
import Accessories from './pages/Accessories';
import Tablets from './pages/tabletsPage/Tablets';
import { HashRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <HashRouter>
      <div className="App"></div>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </HashRouter>
  );
};
