import { useContext } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';

export const FavouritesPage = () => {
  const { favourites } = useContext(ProductsContext);

  return (
    <div className="container ">
      <h2 className="title  is-1">Favourites</h2>
      <p className="mb-6">{favourites.length} items</p>
      <div className="columns">
        {favourites.map(product => (
          <div className="column is-one-quarter" key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
