import BrandNew from './components/BrandNew/BrandNew';
import Categories from './components/Categories/Categories';
import HomeMainSlider from './components/HomeMainSlider/HomeMainSlider';
import HotPrices from './components/HotPrices/HotPrices';

const HomePage = () => {
  return (
    <>
      <HomeMainSlider />
      <BrandNew />
      <Categories />
      <HotPrices />
    </>
  );
};

export default HomePage;
