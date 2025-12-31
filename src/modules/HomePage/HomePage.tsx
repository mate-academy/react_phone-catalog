import { Main } from '../../components/Main/Main';
import { Hero } from './components/Hero';
import { ModelsSlider } from '../../components/ModelsSlider';
import { Categories } from './components/Categories';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/fetchClient';
import { useEffect, useState } from 'react';
import { ErrorContent } from '../../components/ErrorContent/ErrorContent';

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProducts<Product[]>('/api/products.json')
      .then(productsFromServer => {
        setProducts(productsFromServer);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [reload]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => b.year - a.year);

    const uniqueModels: Product[] = [];

    sorted.forEach(product => {
      const baseName = product.name.replace(product.capacity, '').trim();

      const exists = uniqueModels.find(
        item => item.name.replace(item.capacity, '').trim() === baseName,
      );

      if (!exists) {
        uniqueModels.push(product);
      }
    });

    const hotPricesModels = [...products].sort((a, b) => {
      const value1 = a.fullPrice - a.price;
      const value2 = b.fullPrice - b.price;

      return value2 - value1;
    });

    setHotPrices(
      hotPricesModels.filter(product => product.year > 2018).slice(0, 32),
    );

    setNewProducts(uniqueModels.filter(product => product.year > 2020));
  }, [products]);

  return error || loading ? (
    <ErrorContent
      loading={loading}
      error={error}
      onClick={() => {
        setReload(prev => prev + 1);
      }}
    />
  ) : (
    <Main>
      <Hero />
      <ModelsSlider title={'Brand new models'} products={newProducts} />
      <Categories products={products} />
      <ModelsSlider
        title={'Hot prices'}
        products={hotPrices}
        isFullPrise={true}
      />
    </Main>
  );
};
