import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Favourites.scss';

import { ReactComponent as Home } from '../../icons/Home.svg';
import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

import ProductList from '../../components/productList/ProductList';
import { Product } from '../../types/Product';
import { getFavourites } from '../../helpers/Favourites';

const Favourites: React.FC = () => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const updateFavourites = () => {
    const favs = getFavourites();

    setFavourites(favs);
  };

  useEffect(() => {
    updateFavourites();
  }, []);

  return (
    <section className="favourites">
      <div className="favourites-nav">
        <Link to="/">
          <Home className="favourites-nav-icon" />
        </Link>

        <ArrowRight className="favourites-icon" />

        <span className="favourites-nav-page">Favourites</span>
      </div>

      <div className="favourites-title">
        <h2 className="title">
          {favourites.length ? 'Favourites' : 'Your favourites is empty'}
        </h2>

        <h3 className="subtitle">{`${favourites.length} items`}</h3>
      </div>

      <ProductList
        styles="catalog-items-list"
        products={favourites}
        updateFavourites={updateFavourites}
      />
    </section>
  );
};

export default Favourites;
