import React from 'react';
import NavMain from '../../components/NavMain/NavMain';
import { useProduct } from '../../store/Store';
import ProductCard from '../../components/ProductCard/ProductCard';

const FavouritesPage: React.FC = () => {
  const { favourites } = useProduct();

  return (
    <div className="container favourites__container">
      <div className="favourites">
        <NavMain category="Favourites" />

        <h1 className="favourites__title">Favourites</h1>

        {favourites.length > 0 && (
          <span className="favourites__item">{`${favourites.length} items`}</span>
        )}

        <div className="favourites__block">
          {favourites.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
