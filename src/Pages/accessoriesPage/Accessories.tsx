import Header from '../../components/Header/Header';
// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/CatalogAccessories/AccessoriesCatalog';
import Footer from '../../components/Footer/Footer';
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
      <Header favorites={favorites} baskets={baskets} />
      <AccessoriesCatalog
        setFavorites={setFavorites}
        favorites={favorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
      <Footer />
    </>
  );
};

export default Accessories;
