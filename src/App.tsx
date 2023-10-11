import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './scripts/components/0_Layout/Layout';
import { HomePage } from './scripts/pages/0_HomePage/HomePage';
import { CatalogList } from './scripts/pages/1_Catalog/CatalogList';
import { ProductDetailsPage } from './scripts/pages/2_Item/ProductDetailsPage';

import { IGood } from './scripts/helpers/types/IGood';
import { getAll } from './scripts/helpers/api/goods';
import { Context } from './scripts/helpers/context/context';

import './App.scss';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<IGood[]>([]);
  const [cartList, setcartList] = useState<IGood[]>([]);
  const [favList, setFavList] = useState<IGood[]>([]);
  const [filterWord, setFilterWord] = useState('');

  const loadingGoods = async () => {
    const good = await getAll();

    setGoods(good);
  };

  const loadingLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    const favorites = localStorage.getItem('favorites');

    if (cart !== null) {
      setcartList(JSON.parse(cart));
    }

    if (favorites !== null) {
      setFavList(JSON.parse(favorites));
    }
  };

  const toggleCart = (item: IGood) => {
    if (cartList.includes(item)) {
      setcartList(cartList.filter(good => good.id !== item.id));
    } else {
      cartList.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cartList));
  };

  const toggleFav = (item: IGood) => {
    if (favList.includes(item)) {
      setFavList(favList.filter(good => good.id !== item.id));
    } else {
      favList.push(item);
    }

    localStorage.setItem('favorites', JSON.stringify(favList));
  };

  useEffect(() => {
    loadingGoods();
    loadingLocalStorage();
  }, []);

  return (
    <Context.Provider value={{
      goods,
      favList,
      cartList,
      toggleFav,
      toggleCart,
      filterWord,
      setFilterWord,
    }}
    >
      <div className="Site">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path=":product" element={(<CatalogList />)} />
            <Route path=":id" element={(<ProductDetailsPage />)} />
            <Route path="/:product/:id" element={(<ProductDetailsPage />)} />
          </Route>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </Context.Provider>
  );
};
