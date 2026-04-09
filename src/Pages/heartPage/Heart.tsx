// eslint-disable-next-line max-len
import CatalogFavorites from '../../components/CatalogFavorites/CatalogFavorites';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Heart.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type HeartProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: FavoriteProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const Heart = ({ favorites, setFavorites, baskets }: HeartProps) => {
  return (
    <div className="heart">
      <Header favorites={favorites} baskets={baskets} />
      <CatalogFavorites
        favorites={favorites}
        setFavorites={setFavorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
      <Footer />
    </div>
  );
};

export default Heart;
