import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { Card } from '../../components/Card/Card';
import { SearchResult } from '../../components/SearchResult/SearchResult';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useProducts();

  const { appliedQuery } = useProducts();
  const [searchingPhones, setSearchingPhones] = useState(favourites);

  useEffect(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    const searching = favourites.filter(
      i => i.name.toLowerCase().includes(lowerQuery),
    );

    setSearchingPhones(searching);
  }, [appliedQuery, favourites]);

  return (
    <div className="phones">
      <div className="path" data-cy="breadCrumbs">
        <Link to="/" className="go-home" />
        <img src={arrowRight} alt="arrow_right" />
        <h3>Favourites</h3>
      </div>
      {
        appliedQuery ? (
          <SearchResult results={searchingPhones} />
        ) : (
          <>
            <h1 className="phones__title">Favourites</h1>
            <div className="phones__paragraph">{`${favourites.length} items`}</div>
            <div className="phones-container">
              {favourites.map(phone => (
                <Card card={phone} discount key={phone.id} />
              ))}
            </div>
          </>
        )
      }
    </div>
  );
};
