// eslint-disable-next-line max-len
import CatalogFavorites from '../../components/CatalogFavorites/CatalogFavorites';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Heart.scss';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../api';

const Heart = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <div className="heart">
      <Header favorites={favorites} />
      <CatalogFavorites />
      <Footer />
    </div>
  );
};

export default Heart;
