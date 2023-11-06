import React from 'react';
import { useProducts } from '../../context/AppContext';
import { Loader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';
import './HomePage.scss';
import { Errors } from '../../types/Errors';

export const HomePage: React.FC = () => {
  const { isLoading, errorMessage } = useProducts();

  return (
    <>
      <div className="HomePage">
        {isLoading && (<Loader />)}

        {errorMessage === Errors.loadingProducts ? (
          <div className="ErrorMessage">
            {errorMessage}
          </div>
        ) : (
          <>
            <Slider />
            <HotPrices />
            <ShopByCategory />
            <BrandNew />
          </>
        )}
      </div>
    </>
  );
};
