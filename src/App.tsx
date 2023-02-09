// import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header/Header';
import {
  ProductsListWithSlider,
} from './components/Pages/Home/ProductsListWithSlider/ProductsListWithSlider';
import {
  ProductsSlider,
} from './components/Pages/Home/ProductsSlider/ProductsSlider';
import {
  ShopByCategory,
} from './components/Pages/Home/ShopByCategory/ShopByCategory';
import { CartPage } from './components/Pages/Cart/CartPage';
import { FavouritesPage } from './components/Pages/Favourites/FavouritesPage';
import {
  ProductsCardPage,
} from
'./components/Pages/Categories/ProductPagePage/ProductCardList/ProductsCardPage/ProductsCardPage';
import {
  ProductDetailsPage,
} from
  './components/Pages/Categories/ProductPagePage/ProductCardList/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => {
  const [items, setItems] = useState([]);
  const [IPhones, setIPhones] = useState([]);
  const [visibleIPhones, setVisibleIPhones] = useState(IPhones);
  const [hotPriceProducts, setHotPriceProducts] = useState(items);
  const [brandNewProducts, setBrandNewProducts] = useState(items);
  const [searchInput, setSearchInput] = useState('');

  // const [isLoading, setLoading] = useState(true);

  // oldPhones
  // const getHotPriceProducts = () => {
  //   setHotPriceProducts(items.filter((item: any) => item.discount > 0)
  //     .sort((a: any, b: any) => b.discount - a.discount));
  // };
  // const getBrandNewProducts = () => {
  //   setBrandNewProducts(items.filter((item: any) => item.discount === 0)
  //     .sort((a: any, b: any) => a.price - b.price));
  // };

  const getHotPriceProducts = () => {
    setHotPriceProducts(
      IPhones.filter((item: any) => item.price < item.fullPrice)
        .sort((a: any, b: any) => a.price - b.price),
    );
  };

  const getBrandNewProducts = () => {
    setBrandNewProducts(
      IPhones.filter((item: any) => item.price < item.fullPrice)
        .sort((a: any, b: any) => b.price - a.price),
    );
  };

  useEffect(() => {
    getBrandNewProducts();
    getHotPriceProducts();
  }, [IPhones]);

  const getItems = async () => {
    try {
      const response = await fetch(
        // 'https://mate-academy.github.io/react_phone-catalog/api/products.json',
        '../api/products.json',
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        setItems(result);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const getIPhones = async () => {
    try {
      const response = await fetch(
        '../_new/products.json',
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        // console.log(result);

        setIPhones(result);
        setVisibleIPhones(result);
        // setLoading(false);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    getItems();
    getIPhones();
  }, []);

  return (
    <>
      <Header
        setVisibleIPhones={setVisibleIPhones}
        IPhones={IPhones}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {/* {!isLoading && ( */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={(
            <main>
              <ProductsSlider />
              <ProductsListWithSlider
                products={hotPriceProducts}
                title="Hot prices"
              />
              <ShopByCategory phones={IPhones} />
              <ProductsListWithSlider
                products={brandNewProducts}
                title="Brand new models"
              />
            </main>
          )}
        />
        <Route
          path="/phones"
        >
          <Route
            index
            element={(
              <main>
                <ProductsCardPage
                  products={IPhones}
                  setProducts={setIPhones}
                  setVisibleProducts={setVisibleIPhones}
                  visibleProducts={visibleIPhones}
                  title="Mobile phones"
                  searchInput={searchInput}
                />
              </main>
            )}
          />

          <Route
            path=":id"
            element={(
              <main>
                <ProductDetailsPage products={IPhones} />
                <ProductsListWithSlider
                  products={IPhones}
                  title="You may also like"
                />
              </main>
            )}
          />
        </Route>
        <Route
          path="/cart"
          element={(
            <main>
              <CartPage />
            </main>
          )}
        />
        <Route
          path="/favourites"
          element={(
            <main>
              <FavouritesPage />
            </main>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* )} */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
