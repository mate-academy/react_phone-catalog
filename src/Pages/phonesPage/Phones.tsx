import PhonesCatalog from '../../components/CatalogPhones/PhonesCatalog';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type PhonesProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Phones = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
}: PhonesProps) => {
  return (
    <>
      <PhonesCatalog
        setFavorites={setFavorites}
        favorites={favorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </>
  );
};

export default Phones;
