import { useContext } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';
import { Breadcrumb } from '../../components/Breadcrumb';

export const FavouritesPage = () => {
  const { favourites } = useContext(ProductsContext);

  return (
    <div className="container ">
      <Breadcrumb />

      <h2 className="title  is-1">Favourites</h2>
      <p className="mb-6">{favourites.length} items</p>
      <div className="fixed-grid has-4-cols">
        <div className="grid">
          {favourites.map(product => (
            <div className="cell" key={product.id}>
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
