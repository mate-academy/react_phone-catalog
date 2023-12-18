import React from 'react';
import { useProducts } from '../../context/AppContext';

import { Loader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';

import { Errors } from '../../types/Errors';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { isLoading, errorMessage } = useProducts();

  const isLoaderVisible = isLoading && !errorMessage;

  return (
    <>
      <div className="HomePage">
        {isLoaderVisible && (<Loader />)}

        {errorMessage === Errors.loadingProducts ? (
          <div className="ErrorMessage">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="HomePage__top">
              <h1 className="HomePage__title">
                Welcome to Nice Gadgets store!
              </h1>
              <div className="HomePage__slider">
                <Slider />
              </div>
            </div>

            <HotPrices />
            <ShopByCategory />
            <BrandNew />
          </>
        )}
      </div>
    </>
  );
};
