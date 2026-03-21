import './App.scss';
import Home from './Pages/Home';
import Phones from './Pages/Phones';
import Accessories from './Pages/Accessories';
import Tablets from './Pages/Tablets';
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
