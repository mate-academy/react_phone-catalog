// eslint-disable-next-line max-len
import CatalogFavorites from '../../components/CatalogFavorites/CatalogFavorites';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Heart.scss';
import { Product } from '../../types/Product';

type HeartProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const Heart = ({ favorites, setFavorites, isFavorite }: HeartProps) => {
  return (
    <div className="heart">
      <Header favorites={favorites} />
      <CatalogFavorites
        favorites={favorites}
        setFavorites={setFavorites}
        isFavorite={isFavorite}
      />
      <Footer />
    </div>
  );
};

export default Heart;
