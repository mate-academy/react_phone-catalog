import { Banner } from '../components/Banner/banner';
import { slides } from '../../public/api/caouselData.json';
import { Category } from '../components/Categories/categories';
import { HotPrices } from '../components/HotPrices/hot-prices';
import { NewModels } from '../components/NewModels/new-models';
import { Title } from '../components/Title/title';

export const HomePage = () => {
  return (
    <>
      <Title />
      <Banner data={slides} />
      <NewModels />
      <Category />
      <HotPrices />
    </>
  );
};
