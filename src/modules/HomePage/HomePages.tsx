import { Banner } from './Banner/Banner';
import { slides } from '../../../public/api/caouselData.json';
import { Category } from './Categories/Categories';
import { HotPrices } from './HotPrices/Hot-prices';
import { NewModels } from './NewModels/New-models';
import { Title } from './Title/Title';
import { Phone } from '../../Types/type';

interface HomePageProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
  itemsInCart:Phone[];
}

export const HomePage = ({
  toggleInCart,
  toggleFavourite,
  favouriteButton,
  itemsInCart
}: HomePageProps) => {
  return (
    <>
      <Title />
      <Banner data={slides} />
      <NewModels
        favouriteButton={favouriteButton}
        toggleInCart={toggleInCart}
        toggleFavourite={toggleFavourite}
        itemsInCart={itemsInCart}
      />
      <Category />
      <HotPrices
        favouriteButton={favouriteButton}
        toggleInCart={toggleInCart}
        toggleFavourite={toggleFavourite}
        itemsInCart={itemsInCart}
      />
    </>
  );
};
