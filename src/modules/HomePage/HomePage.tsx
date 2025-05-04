import React from 'react';
import { Hero } from '../../components/Hero';
import { NewModels } from '../../components/NewModels';
import { Category } from '../../components/Category';
import { HotPrices } from '../../components/HotPrices';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';

export const HomePage: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  const categoryTotals = products?.reduce(
    (totals, product) => {
      return {
        phones: totals.phones + (product.category === 'phones' ? 1 : 0),
        tablets: totals.tablets + (product.category === 'tablets' ? 1 : 0),
        accessories:
          totals.accessories + (product.category === 'accessories' ? 1 : 0),
      };
    },
    { phones: 0, tablets: 0, accessories: 0 },
  );

  return (
    <main>
      <Hero />
      {error ? (
        <h2>Something went wrong</h2>
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <NewModels products={products} />
          <Category
            phonesTotal={categoryTotals.phones}
            tabletsTotal={categoryTotals.tablets}
            accessoriesTotal={categoryTotals.accessories}
          />
          <HotPrices products={products} />
        </>
      )}
    </main>
  );
};
