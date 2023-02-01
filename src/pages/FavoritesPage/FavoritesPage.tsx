import React, { useContext, useEffect, useState } from 'react';
import { FavContext } from '../../components/FavContext';
import { Loader } from '../../components/Loader/Loader';
import { ProductPage } from '../../components/ProductPage';
import { getProducts } from '../../helpers/getProducts';
import { Product } from '../../types/Product';

export const FavoritesPage: React.FC = () => {
  const { favs } = useContext(FavContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await getProducts();

        setProducts(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const showProductPage
    = !isLoading && !isError;

  const visibleItems = [...products].filter(({ id }) => favs.includes(id));

  return (
    <>
      {isLoading && (
        <div className="page__loader-container">
          <Loader />
        </div>
      )}
      {showProductPage && (
        <ProductPage
          title="Favorites"
          products={visibleItems}
        />
      )}
    </>
  );
};
