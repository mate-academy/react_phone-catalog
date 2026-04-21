// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/Catalogs/CatalogAccessories/AccessoriesCatalog';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type AccessoriesProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Accessories = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
}: AccessoriesProps) => {
  return (
    <>
      <AccessoriesCatalog
        setFavorites={setFavorites}
        favorites={favorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </>
  );
};

export default Accessories;
