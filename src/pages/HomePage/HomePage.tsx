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

  return (
    <>
      <div className="HomePage">
        {isLoading && !errorMessage && (<Loader />)}

        {errorMessage === Errors.loadingProducts ? (
          <div className="ErrorMessage">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="container container--slider">
              <div className="HomePage__slider">
                <Slider itemWidth={300} />
              </div>
              <div className="HomePage__slider--mobileXL">
                <Slider itemWidth={420} />
              </div>
              <div className="HomePage__slider--tablet">
                <Slider itemWidth={550} />
              </div>
              <div className="HomePage__slider--tabletXL">
                <Slider itemWidth={800} />
              </div>
              <div className="HomePage__slider--desktop">
                <Slider itemWidth={1040} />
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
