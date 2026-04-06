import Header from '../../components/Header/Header';
// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/CatalogAccessories/AccessoriesCatalog';
import Footer from '../../components/Footer/Footer';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type AccessoriesProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const Accessories = ({ favorites, setFavorites }: AccessoriesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <AccessoriesCatalog setFavorites={setFavorites} favorites={favorites} />
      <Footer />
    </>
  );
};

export default Accessories;
