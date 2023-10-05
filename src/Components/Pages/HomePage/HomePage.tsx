import { Header } from '../../Header/Header';
import { Slider } from './Slider';
import { HotPrices } from './HotPrice';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <Header searchValue="" setSearchValue={() => null} />
      <Slider />
      <HotPrices
        title="Hot prices"
        maxPrice={1050}
        minYear={2018}
        minPrice={300}
      />
      <ShopByCategory />
      <HotPrices
        title="Brand new models"
        maxPrice={2000}
        minYear={2018}
        minPrice={1400}
      />
      {/* <Footer /> */}
    </>

  );
};
