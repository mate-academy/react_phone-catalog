import React from 'react';
import cn from 'classnames';
import { useProductsList } from '../components/_hooks/useProductsList';
import { Heading } from '../components/Heading/Heading';
import { ProductsAmount } from '../components/ProductsAmount/ProductsAmount';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { getFavorites } from '../redux';

export const FavoritesPage = () => {
  const {
    numberOfProducts,
    search,
    location,
  } = useProductsList();
  const favorites: Product[] = useSelector(getFavorites);

  return (
    <div className="container">
      <section className={cn({
        section: true,
        pt24: location.pathname !== '/',
      })}
      >
        {!search.get('query') && (
          <>
            <Breadcrumbs />
            <Heading title="Favorites" />
          </>
        )}
        {numberOfProducts !== 0 && (
          <ProductsAmount title="favorites" />
        )}
        <div className="products section__products">
          {favorites.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};
