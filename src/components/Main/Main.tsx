import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import HomePage from '../HomePage/HomePage';
import GadgetsPage from '../GadgetsPage/GadgetsPage';
import { PageType } from 'src/types/PageType';
import CartPage from '../CartPage/CartPage';
import './MainStyle.scss';
import CardPage from '../CardPage/CardPage';
import { StateContext } from 'src/store';
import Loader from '../ui/Loader/Loader';
import classNames from 'classnames';

register();

const Main = () => {
  const { selectedProduct, isMenuOpen } = useContext(StateContext);

  const getTypeByIdProduct = () => {
    // Логіка для визначення типу на основі idProduct або інша бізнес-логіка
    // наприклад, можна визначити тип з `selectedProduct` або викликати API
    return selectedProduct?.category || '';
  };

  return (
    <main className={classNames('main', { 'main-hidden': isMenuOpen })}>
      <Routes>
        {/* Домашня сторінка */}
        <Route path="/" element={<HomePage />} index />

        {/* Сторінки категорій */}
        <Route
          path={PageType.Phones}
          element={<GadgetsPage type={PageType.Phones} />}
        />
        <Route
          path={`${PageType.Phones}/:idProduct`}
          element={<CardPage type={PageType.Phones} />}
        />

        <Route
          path={PageType.Tablets}
          element={<GadgetsPage type={PageType.Tablets} />}
        />
        <Route
          path={`${PageType.Tablets}/:idProduct`}
          element={<CardPage type={PageType.Tablets} />}
        />

        <Route
          path={PageType.Accessories}
          element={<GadgetsPage type={PageType.Accessories} />}
        />
        <Route
          path={`${PageType.Accessories}/:idProduct`}
          element={<CardPage type={PageType.Accessories} />}
        />

        <Route
          path={PageType.Favourite}
          element={<GadgetsPage type={PageType.Favourite} />}
        />
        <Route
          path={`${PageType.Favourite}/:idProduct`}
          element={<CardPage type={PageType.Favourite} />}
        />

        {/* Сторінка продукту без визначеного типу */}
        <Route
          path="/:idProduct"
          element={
            !!selectedProduct ? (
              <CardPage type={getTypeByIdProduct()} />
            ) : (
              <Loader />
            )
          }
        />

        {/* Сторінка кошика */}
        <Route path="Cart" element={<CartPage />} />

        {/* 404 сторінка */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </main>
  );
};

export default Main;
