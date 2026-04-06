import './Tablets.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabletsCatalog from '../../components/CatalogTablets/TabletsCatalog';
import { Product } from '../../types/Product';

type TabletsProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const Tablets = ({ favorites, setFavorites, isFavorite }: TabletsProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <TabletsCatalog
        favorites={favorites}
        setFavorites={setFavorites}
        isFavorite={isFavorite}
      />
      <Footer />
    </>
  );
};

export default Tablets;
