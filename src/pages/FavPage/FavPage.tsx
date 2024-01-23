import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { PhoneContext } from '../../utils/PhoneContext';

export const FavPage: React.FC = () => {
  const { favPhones } = useContext(PhoneContext);

  return (
    <div>
      {Boolean(!favPhones.length) && (
        <NavLink to="/phones" className="FavPage_isEmpty">
          You have no items in favorites.
        </NavLink>
      )}
      {Boolean(favPhones.length) && (
        <div className="FavPage">
          <div className="FavPage_nav">
            <Link
              to="/"
              className="FavPage_nav_link"
            />
            <span className="FavPage_nav_text">
              {'>'}
            </span>
            <span className="FavPage_nav_text">
              Favorites
            </span>
          </div>

          <h1 className="FavPage_title">
            Favorites
          </h1>

          <span className="FavPage_count">
            {}
          </span>

          <div className="FavPage_list">
            {favPhones.map(phone => (
              <ProductCard key={phone.id} phone={phone} position={0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
