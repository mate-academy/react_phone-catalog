import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';
import { ProductItem } from '../../types/ProductItem';
import { useAppSelector } from '../../hooks/redux';
import './favourites.scss';

export const Favourites: React.FC = () => {
  const { favourites } = useAppSelector((state) => state.favourites);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavourites = favourites.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="favourites">
      <div className="container">
        <BreadCrumbs title="Favourites" />

        <div className="favourites__block">
          <h1 className="favourites__title title">Favourites</h1>

          {filteredFavourites.length > 0 && (
            <p className="favourites__count">
              {`${filteredFavourites.length} items`}
            </p>
          )}

          <div className="favourites__content">
            {filteredFavourites
              && filteredFavourites.map((item: ProductItem) => (
                <ProductCard card={item} />
              ))}
          </div>

          {filteredFavourites.length === 0 && (
            <div className="favourites__empty">Favourites is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};
