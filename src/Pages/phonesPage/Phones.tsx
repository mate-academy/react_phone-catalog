import Header from '../../components/Header/Header';
import PhonesCatalog from '../../components/CatalogPhones/PhonesCatalog';
import Footer from '../../components/Footer/Footer';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type PhonesProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const Phones = ({ favorites, setFavorites }: PhonesProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <PhonesCatalog setFavorites={setFavorites} favorites={favorites} />
      <Footer />
    </>
  );
};

export default Phones;
