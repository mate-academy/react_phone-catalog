import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import HomePage from '../HomePage/HomePage';
import GadgetsPage from '../GadgetsPage/GadgetsPage';
import { PageType } from 'src/types/PageType';
import CartPage from '../CartPage/CartPage';
import './MainStyle.scss';
import CardPage from '../CardPage/CardPage';

register();

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path=':id' element={<CardPage/>}/>
        </Route>
        <Route path={PageType.Phones} element={<GadgetsPage type={PageType.Phones} />} />
        <Route path={PageType.Phones} element={<GadgetsPage type={PageType.Phones} />}>
          <Route path=":id" element={<CardPage />} />
        </Route>
        <Route path={PageType.Tablets} element={<GadgetsPage type={PageType.Tablets} />}>
          <Route path=":id" element={<CardPage />} />
        </Route>
        <Route path={PageType.Accessories} element={<GadgetsPage type={PageType.Accessories} />}>
          <Route path=":id" element={<CardPage />} />
        </Route>
        <Route path={PageType.Favourite} element={<GadgetsPage type={PageType.Favourite} />}>
          <Route path=":id" element={<CardPage />} />
        </Route>
        <Route path="Cart" element={<CartPage />} />
        <Route path='Card' element={<CardPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </main>
  );
};

export default Main;
