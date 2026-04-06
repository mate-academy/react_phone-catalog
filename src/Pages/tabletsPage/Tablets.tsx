import './Tablets.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabletsCatalog from '../../components/CatalogTablets/TabletsCatalog';
import { Product } from '../../types/Product';

type TabletsProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
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
