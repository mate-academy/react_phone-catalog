import { useQuery } from '@tanstack/react-query';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getProductsById } from '../api/products';
import { useLocalStorage } from 'usehooks-ts';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Loader } from '../components/Loader';

export const FavouritesPage = () => {
  const [favourites] = useLocalStorage<Product['itemId'][]>('favourites', []);

  const { isLoading: isFavouriteProducts, data: favouriteProducts } = useQuery({
    queryKey: ['favouriteProducts', favourites.length],
    queryFn: () => getProductsById(favourites),
  });

  return (
    <main className="content pt-6">
      <section className="pb-14 md:pb-16 lg:pb-20">
        <Breadcrumbs />

        <h2 className="mt-6 md:mt-10">Favourites</h2>

        <p className="mt-2 font-semibold text-secondary">
          {favouriteProducts?.length || 0} models
        </p>

        {!favouriteProducts?.length && (
          <h2 className="mt-6 md:mt-10">Not Favourites Yet</h2>
        )}

        {isFavouriteProducts ? (
          <Loader />
        ) : (
          <div className="mt-8 flex gap-4 md:mt-10">
            {favouriteProducts?.map(product => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
