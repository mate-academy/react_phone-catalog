import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { Favourites } from '../Favourites/Favourites';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Loader } from '../Loader';
import { getProducts } from '../../api/products';
import { Error } from '../Error/Error';

export const FavouritesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
        setIsLoading(false);
      } catch {
        setError('We can not load products.');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        {isLoading
          ? <Loader />
          : (
            <>
              <Breadcrumbs />

              {error
                ? <Error />
                : <Favourites products={products} />}
            </>
          )}
      </div>

      <Footer />
    </>
  );
};
