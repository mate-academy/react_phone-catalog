import { useContextSelector } from 'use-context-selector';
import { ProductCard } from '../../components/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';
import { Breadcrumb } from '../../components/Breadcrumb';

import s from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const favourites = useContextSelector(ProductsContext, ctx => ctx.favourites);

  return (
    <>
      <Breadcrumb />

      <h2 className="title is-size-3-mobile is-size-1 mb-2">Favourites</h2>
      <p className={`${s.fav_items}`}>{favourites.length} items</p>
      <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen favourites">
        <div className="grid">
          {favourites.map(product => (
            <div className="cell" key={product.id}>
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
