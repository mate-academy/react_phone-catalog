import { Catalog } from '../../components/Catalog/Catalog';
import { CardItem } from '../../types/СardItem';
import { useFavorites } from '../../components/Context/FavoriteContext';
import { Link } from 'react-router-dom';
import home from '../Phone/phoneImg/Home.svg';
import vector from '../Phone/phoneImg/Vector (PhonePage).svg';
import '../Phone/phonePage.scss';

export const FavoritePage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <div className="phone">
        <div className="phone__header">
          <Link to="/" className="phone__header-back">
            <img src={home} alt="Home" className="phone__header-home" />
          </Link>
          <div className="phone__heder-arrow">
            <img src={vector} className="phone__header-vector" />
          </div>
          <div className="phone__header-title">Favorites</div>
        </div>
        <Catalog<CardItem>
          title="Favorites"
          totalLabel={`${favorites.length} items`}
          items={favorites}
          mapToCardItem={item => item}
        />
      </div>
    </>
  );
};
