import React from 'react';
import { Hero } from '../../components/Hero';
import { Category } from '../../components/Category';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';
import { ProductsSlider } from '../../shared/ProductsSlider';
import { ErrorPage } from '../ErrorPage';

export const HomePage: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  if (error) {
    return <ErrorPage />;
  }

  const hotPrices = products
    ?.map(product => ({
      ...product,
      discount: product.fullPrice - product.price,
    }))
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 20);

  const newModels = products
    ?.filter(product => product.category === 'phones')
    .filter(product => product.capacity === '512GB')
    .reverse();

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <ProductsSlider
            products={newModels}
            title="Brand new models"
            fullPriceActive
          />
          <Category
            phonesTotal={categoryTotals.phones}
            tabletsTotal={categoryTotals.tablets}
            accessoriesTotal={categoryTotals.accessories}
          />
          <ProductsSlider
            products={hotPrices}
            title="Hot prices"
            fullPriceActive
          />
        </>
      )}
    </main>
  );
};
