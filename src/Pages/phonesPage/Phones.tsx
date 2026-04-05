import Header from '../../components/Header/Header';
import PhonesCatalog from '../../components/CatalogPhones/PhonesCatalog';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../api';

const Phones: React.FC = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <>
      <Header favorites={favorites} />
      <PhonesCatalog />
      <Footer />
    </>
  );
};

export default Phones;
