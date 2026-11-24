import { Categories } from '../../components/Categories';
import { Hero } from '../../components/Hero';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { StatusMessage } from '../../components/StatusMessage';
import { getProducts } from '../../api/products';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);
  const hotPricesProducts = products
    .filter(product => product.fullPrice - product.price > 0)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [attempt]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StatusMessage
        text="Something went wrong"
        onReload={() => setAttempt(prev => prev + 1)}
      />
    );
  }

  return (
    <>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <Hero />
      <ProductsSlider title="Brand new models" products={brandNewProducts} />
      <Categories
        phonesCount={phonesCount}
        tabletsCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      />
      <ProductsSlider title="Hot prices" products={hotPricesProducts} />
    </>
  );
};
