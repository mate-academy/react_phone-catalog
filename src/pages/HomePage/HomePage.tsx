import { useContext } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import { Categories } from '../../components/Categories/Categories';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { Loader } from '../../components/Loader/Loader';
import './HomePage.scss';

export const HomePage = () => {
  const { isLoading } = useContext(GlobalContext);

  return (
    <div className="home-page">
      {isLoading ? (
        <Loader />
      ) : (
          <>
            <BannerSlider />
            <HotPrices />
            <Categories />
            <BrandNew />
          </>
      )}
    </div>
  );
};
