/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
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
import { NotFoundPage } from './components/Pages/NotFoundPage/NotFoundPage';
import { Product } from './types/types';
import { ProductsListWithSlider } from './components/Pages/Home/ProductsListWithSlider/ProductsListWithSlider';
import { Contacts } from './components/Pages/Contacts/Contacts';
import { Rights } from './components/Pages/Rights/Rights';
import { Checkout } from './components/Pages/Checkout/Checkout';

type Props = {
  IPhones: Product[],
  visibleIPhones: Product[],
  isError: boolean,
  searchInput: string,
  setIPhones: (value: Product[])=> void,
  setVisibleIPhones: (value: Product[])=>void,
};

export const CreatedRoutes:React.FC<Props> = ({
  IPhones, visibleIPhones, setVisibleIPhones,
  isError, searchInput, setIPhones,
}) => {
  const [shuffeledIPhones, setShuffeledIPhones] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const getHotPriceProducts = () => {
    setHotPriceProducts(
      IPhones.filter((item: Product) => item.price < item.fullPrice)
        .sort((a: Product, b: Product) => a.price - b.price),
    );
  };

  const getBrandNewProducts = () => {
    setBrandNewProducts(
      IPhones.filter((item: Product) => item.price < item.fullPrice)
        .sort((a: Product, b: Product) => b.price - a.price),
    );
  };

  const getSuggestedProducts = () => {
    setShuffeledIPhones(IPhones.sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    getBrandNewProducts();
    getHotPriceProducts();
    getSuggestedProducts();
  }, [IPhones]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={(
          <>
            <ProductsSlider />
            {!isError
              ? (
                <>
                  <ProductsListWithSlider
                    products={hotPriceProducts}
                    title="Hot prices"
                  />
                  <ShopByCategory
                    phones={IPhones}
                  />
                  <ProductsListWithSlider
                    products={brandNewProducts}
                    title="Brand new models"
                  />
                </>
              )
              : <h2>No products found</h2>}
          </>
        )}
      />
      <Route path="/phones">
        <Route
          index
          element={(
            <ProductsCardPage
              products={IPhones}
              setProducts={setIPhones}
              setVisibleProducts={setVisibleIPhones}
              visibleProducts={visibleIPhones}
              title="Phones"
              searchInput={searchInput}
            />
          )}
        />
        <Route
          path=":id"
          element={(
            <>
              <ProductDetailsPage
                products={IPhones}
              />
              <ProductsListWithSlider
                products={shuffeledIPhones}
                title="You may also like"
              />
            </>
          )}
        />
      </Route>

      <Route path="/tablets">
        <Route
          index
          element={(
            <ProductsCardPage
              products={[]}
              visibleProducts={[]}
              title="Tablets"
              searchInput={searchInput}
            />
          )}
        />
      </Route>

      <Route path="/accessories">
        <Route
          index
          element={(
            <ProductsCardPage
              products={[]}
              visibleProducts={[]}
              title="Accessories"
              searchInput={searchInput}
            />
          )}
        />
      </Route>

      <Route
        path="/cart"
        element={(
          <CartPage />
        )}
      />
      <Route
        path="/favourites"
        element={(
          <FavouritesPage />
        )}
      />
      <Route
        path="/checkout"
        element={(<Checkout />)}
      />
      <Route
        path="/rights"
        element={(<Rights />)}
      />
      <Route
        path="/contacts"
        element={<Contacts />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
