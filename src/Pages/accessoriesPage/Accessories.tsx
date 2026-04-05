import Header from '../../components/Header/Header';
// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/CatalogAccessories/AccessoriesCatalog';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';

type AccessoriesProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Accessories = ({ favorites, setFavorites }: AccessoriesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <AccessoriesCatalog favorites={favorites} setFavorites={setFavorites} />
      <Footer />
    </>
  );
};

export default Accessories;
