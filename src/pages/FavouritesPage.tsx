import { useContext } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { ProductContext } from '../context/ProductContext';
import UrlTrail from '../components/ui/UrlTrail';

const FavouritesPage = () => {
  const { favourites } = useContext(ProductContext);

  return (
    <main className="flex  gap-10 px-4 sm:px-6 md:px-8 flex-col">
      <UrlTrail />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Favourites</h1>
        <p className="text-sm text-gray-400">{favourites.length} items</p>
      </div>
      {/* justify property subject to change */}
      <div
        className="flex gap-4 h-full justify-center
      sm:justify-start flex-grow w-full flex-wrap"
      >
        {favourites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {favourites.length === 0 && <h1>There are no favourites yet...</h1>}
      </div>
    </main>
  );
};

export default FavouritesPage;
