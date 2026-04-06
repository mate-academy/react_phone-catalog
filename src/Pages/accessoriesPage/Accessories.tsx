import Header from '../../components/Header/Header';
// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/CatalogAccessories/AccessoriesCatalog';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';

type AccessoriesProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const Accessories = ({
  favorites,
  setFavorites,
  isFavorite,
}: AccessoriesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <AccessoriesCatalog setFavorites={setFavorites} isFavorite={isFavorite} />
      <Footer />
    </>
  );
};

export default Accessories;
