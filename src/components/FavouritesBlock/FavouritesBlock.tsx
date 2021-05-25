import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { getFavouritesGoods } from '../../store';
import { NoSelected } from '../NoSelected';
import './FavouritesBlock.scss';

export const FavouritesBlock = () => {
  const favouritesGoods = useSelector(getFavouritesGoods);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get('query') || '';
  const visibleProducts = favouritesGoods.filter(good => good.name.toLowerCase().includes(query));

  if (!favouritesGoods.length) {
    return <NoSelected />;
  }

  return (
    <>
      <span className="Favourites-Quantity">
        {`${favouritesGoods.length} ${favouritesGoods.length === 1
          ? 'item'
          : 'items'}`}
      </span>
      <section className="Favourites Main-Favourites">
        <div className="Favourites-Products">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};
