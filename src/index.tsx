/* eslint-disable max-len */
import ReactDOM from 'react-dom';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './components/App';
import { Notfound } from './pages/Notfound';
import { Startpage } from './pages/Startpage';
import { Goodspage } from './pages/Goodspage';
import { Accessories } from './pages/Accessories';
import { Favourites } from './components/Favourites';
import { Cart } from './components/Cart';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './output.css';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/" element={<App />}>
        <Route index element={<Startpage />} />
        <Route path="*" element={<Notfound />} />
        <Route path="phones">
          <Route path=":itemcard?" element={<Goodspage title="Mobile phones" />} />
        </Route>
        <Route path="tablets">
          <Route path=":itemcard?" element={<Goodspage title="Tablets" />} />
        </Route>
        <Route path="accessories">
          <Route path=":itemcard?" element={<Accessories />} />
        </Route>
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </HashRouter>,
  root,
);
