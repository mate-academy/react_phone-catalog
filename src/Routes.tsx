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
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Product } from './types/types';
import { ProductsListWithSlider } from './components/Pages/Home/ProductsListWithSlider/ProductsListWithSlider';

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
          <main>
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
          </main>
        )}
      />
      <Route path="/phones">
        <Route
          index
          element={(
            <main>
              <ProductsCardPage
                products={IPhones}
                setProducts={setIPhones}
                setVisibleProducts={setVisibleIPhones}
                visibleProducts={visibleIPhones}
                title="Phones"
                searchInput={searchInput}
              />
            </main>
          )}
        />
        <Route
          path=":id"
          element={(
            <main>
              <ProductDetailsPage
                products={IPhones}
              />
              <ProductsListWithSlider
                products={shuffeledIPhones}
                title="You may also like"
              />
            </main>
          )}
        />
      </Route>

      <Route path="/tablets">
        <Route
          index
          element={(
            <main>
              <ProductsCardPage
                products={[]}
                visibleProducts={[]}
                title="Tablets"
                searchInput={searchInput}
              />
            </main>
          )}
        />
      </Route>

      <Route path="/accessories">
        <Route
          index
          element={(
            <main>
              <ProductsCardPage
                products={[]}
                visibleProducts={[]}
                title="Accessories"
                searchInput={searchInput}
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
      <Route
        path="/rights"
        element={(
          <main>
            <div className="body12">
              At vero eos et
              accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium
              voluptatum deleniti
              atque corrupti quos dolores et
              quas molestias excepturi sint.
            </div>
          </main>
        )}
      />
      <Route
        path="/contacts"
        element={(
          <main>
            <h3 className="body12">
              Modile: 12345678
              <br />
              Facebook: iphone777
            </h3>
          </main>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
