import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { useReadLocalStorage } from 'usehooks-ts';
import { getProductsById } from '../api/products';
import { useQuery } from '@tanstack/react-query';

export const FavoritesPage: React.FC = () => {
  const favourites = useReadLocalStorage<number[]>('favourites');

  const { data = [], isLoading } = useQuery({
    queryKey: ['favouritesCards'],
    queryFn: () => getProductsById(favourites || []),
  });

  return (
    <main className="content-padding w-full pb-14 pt-6 md:pb-20">
      <Breadcrumbs />

      <h1 className="mt-6 md:mt-10">Favourites</h1>

      <p className="mt-2 text-secondary">{favourites?.length || 0} items</p>

      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <ProductsList className="mt-8 md:mt-10" cards={data} />
      ) : (
        <h1 className="mt-8 flex justify-center md:mt-10">
          There are no favourites yet
        </h1>
      )}
    </main>
  );
};
