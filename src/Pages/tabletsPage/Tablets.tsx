import './Tablets.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabletsCatalog from '../../components/CatalogTablets/TabletsCatalog';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type TabletsProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const Tablets = ({ favorites, setFavorites }: TabletsProps) => {
  return (
    <>
      <Header favorites={favorites} />
      <TabletsCatalog favorites={favorites} setFavorites={setFavorites} />
      <Footer />
    </>
  );
};

export default Tablets;
