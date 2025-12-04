import { Banner } from './Banner/Banner';
import { slides } from '../../../public/api/caouselData.json';
import { Category } from './Categories/Categories';
import { HotPrices } from './HotPrices/Hot-prices';
import { NewModels } from './NewModels/New-models';
import { Title } from './Title/Title';
import { Phone } from '../../Types/type';

interface HomePageProps {
  favourites: Set<string>;
  toggleFavourite: (product: Phone) => void;
}


export const HomePage = ({ favourites, toggleFavourite }: HomePageProps) => {
  return (
    <>
      <Title />
      <Banner data={slides} />
      <NewModels
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
      <Category />
      <HotPrices
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
    </>
  );
};
