import { useContext } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import { Categories } from '../../components/Categories/Categories';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { Loader } from '../../components/Loader/Loader';
import { Error } from '../../types/Error';

export const HomePage = () => {
  const { isLoading, errorMessage } = useContext(GlobalContext);

  return (
    <>
      {isLoading && <Loader />}

      {errorMessage === Error.loadingProducts ? (
        <div>{errorMessage}</div>
      ) : (
        <>
          <BannerSlider />
          <HotPrices />
          <Categories />
          <BrandNew />
        </>
      )}
    </>
  );
};
