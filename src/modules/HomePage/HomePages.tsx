import { Banner } from './Banner/Banner';
import { slides } from '../../../public/api/caouselData.json';
import { Category } from './Categories/Categories';
import { HotPrices } from './HotPrices/Hot-prices';
import { NewModels } from './NewModels/New-models';
import { Title } from './Title/Title';

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
