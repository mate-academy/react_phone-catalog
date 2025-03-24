import { Banner } from '../../components/Banner';
import { HotPrices } from '../../components/HotPrices';
import { NewModels } from '../../components/NewModels';
import { ShopCategory } from '../../components/ShopCategory';

export const HomePage = () => {
  return (
    <>
      <Banner />
      <NewModels />
      <ShopCategory />
      <HotPrices />
    </>
  );
};
