import './Tablets.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TabletsCatalog from '../../components/CatalogTablets/TabletsCatalog';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../api';

const Tablets: React.FC = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <>
      <Header favorites={favorites} />
      <TabletsCatalog />
      <Footer />
    </>
  );
};

export default Tablets;
