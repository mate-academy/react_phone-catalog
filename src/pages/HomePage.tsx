import { useEffect, useMemo, useState } from 'react';
import { Category } from '../components/Category';
import { ProductSlider } from '../components/ProductSlider';
import { Welcome } from '../components/Welcome';
import { useProducts } from '../hooks/useProducts';
import { ProductCategories } from '../types/ProductCategories';
import { PRODUCTS_TITLE } from '../constants/PRODUCTS_TITLE';

type ProductCounts = Record<ProductCategories, number>;

export const HomePage = () => {
  const { products } = useProducts();

  const initializeProductCounts = (): Record<ProductCategories, number> => {
    const initialCounts = {} as ProductCounts;

    for (const category of Object.keys(PRODUCTS_TITLE) as ProductCategories[]) {
      initialCounts[category] = 0;
    }

    return initialCounts;
  };

  const [productCounts, setProductCounts] = useState<ProductCounts>(() =>
    initializeProductCounts(),
  );

  useEffect(() => {
    const counts = products.reduce((acc, item) => {
      if (item.category in acc) {
        // eslint-disable-next-line
        acc[item.category] += 1;
      }

      return acc;
    }, productCounts);

    setProductCounts(counts);
  }, [products, setProductCounts, productCounts]);

  const hotPriceModels = useMemo(() => {
    return [...products].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
  }, [products]);

  const newestModels = useMemo(() => {
    const latestYear = Math.max(...products.map(product => product.year));

    return [...products]
      .filter(product => product.year === latestYear)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <>
      <Welcome />
      <ProductSlider title="Brand new models" items={newestModels} />
      <Category productCounts={productCounts} />
      <ProductSlider title="Hot prices" items={hotPriceModels} />
    </>
  );
};
