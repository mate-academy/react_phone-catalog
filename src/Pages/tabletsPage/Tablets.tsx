import './Tablets.scss';
// eslint-disable-next-line max-len
import TabletsCatalog from '../../components/Catalogs/CatalogTablets/TabletsCatalog';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type TabletsProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Tablets = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
}: TabletsProps) => {
  return (
    <>
      <TabletsCatalog
        favorites={favorites}
        setFavorites={setFavorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </>
  );
};

export default Tablets;
