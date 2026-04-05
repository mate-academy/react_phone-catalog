import Header from '../../components/Header/Header';
import PhonesCatalog from '../../components/CatalogPhones/PhonesCatalog';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';

type PhonesProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Phones = ({ favorites, setFavorites }: PhonesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <PhonesCatalog favorites={favorites} setFavorites={setFavorites} />
      <Footer />
    </>
  );
};

export default Phones;
