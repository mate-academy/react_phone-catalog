import Header from '../../components/Header/Header';
// eslint-disable-next-line max-len
import AccessoriesCatalog from '../../components/CatalogAccessories/AccessoriesCatalog';
import Footer from '../../components/Footer/Footer';
import { useLocalStorage } from '../../api';
import { Product } from '../../types/Product';

const Accessories: React.FC = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <>
      <Header favorites={favorites} />
      <AccessoriesCatalog />
      <Footer />
    </>
  );
};

export default Accessories;
