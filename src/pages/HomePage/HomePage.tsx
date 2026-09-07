/*eslint max-len: ["error", { "code": 90 }]*/
import { BrandNewModels } from '../../components/HomePageComponents/BrandNewModels';
import { Header } from '../../components/HomePageComponents/Header';
import { HotPrice } from '../../components/HomePageComponents/HotPrice';
import { ShopByCategory } from '../../components/HomePageComponents/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <div className="home-page__container">
        <Header />
        <BrandNewModels />
        <ShopByCategory />
        <HotPrice />
      </div>
    </>
  );
};
