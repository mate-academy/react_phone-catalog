import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { MenuSuperior } from './components/menuSuperior/MenuSuperior';
import { MobilePhones } from './components/MobilePhones/MobilePhones';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { PageItem } from './components/PageItem/PageItem';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => (
  <div className="App">
    <MenuSuperior />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<MobilePhones />} />
      <Route path="/tablets" element={<Tablets />} />
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/item/:id" element={<PageItem />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);
