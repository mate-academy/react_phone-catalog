import Header from '../../components/Header/Header';
import PhonesCatalog from '../../components/CatalogPhones/PhonesCatalog';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';

type PhonesProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const Phones = ({ favorites, setFavorites, isFavorite }: PhonesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <PhonesCatalog setFavorites={setFavorites} isFavorite={isFavorite} />
      <Footer />
    </>
  );
};

export default Phones;
