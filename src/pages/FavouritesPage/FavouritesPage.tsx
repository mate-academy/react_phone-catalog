import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { FavouritesContext } from '../../helpers/FavouritesProvider';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

import './FavouritesPage.scss';

export const FavouritePage: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const { favourites } = useContext(FavouritesContext);
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get('query')?.toString() || '';

  let visibleProducts = useMemo(() => {
    return products.filter(product => favourites.includes(product.id));
  }, [favourites]);

  if (query) {
    visibleProducts = visibleProducts.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }

  return (
    <main>
      <div className="favourites container">
        <Breadcrumbs />
        <h2 className="favourites__title">Favourites</h2>
        <p className="favourites__count">{`${visibleProducts.length} items`}</p>
        <div className="favourites__content">
          {visibleProducts.map(p => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </main>
  );
};
