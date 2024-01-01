import { Link } from 'react-router-dom';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { Card } from '../../components/Card/Card';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useProducts();

  return (
    <div className="phones">
      <div className="path" data-cy="breadCrumbs">
        <Link to="/" className="go-home" />
        <img src={arrowRight} alt="arrow_right" />
        <h3>Favourites</h3>
      </div>
      <h1 className="phones__title">Favourites</h1>
      <div className="phones__paragraph">{`${favourites.length} items`}</div>
      <div className="phones-container">
        {favourites.map(phone => (
          <Card card={phone} discount key={phone.id} />
        ))}
      </div>
    </div>
  );
};
