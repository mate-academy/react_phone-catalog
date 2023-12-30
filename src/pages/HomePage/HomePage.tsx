import React from 'react';
import { useProducts } from '../../context/AppContext';
import { Slider } from '../../components/Slider/Slider';
import { Loader } from '../../components/Loader/Loader';
import { Errors } from '../../types/Errors';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { isLoading, errorMessage } = useProducts();

  const isLoaderVisible = isLoading && !errorMessage;

  return (
    <>
      <div className="HomePage">
        {isLoaderVisible && (
          <Loader />
        )}

        {errorMessage === Errors.loadingProducts ? (
          <div className="ErrorMessage">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="HomePage__top">
              <h1 className="HomePage__title">
                Welcome to MyApple store!
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
