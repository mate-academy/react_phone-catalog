import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { Categories } from '../../components/Categories/Categories';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);

  const hotPricesProducts = [...products]
    .filter(product => product.fullPrice && product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = (a.fullPrice || 0) - a.price;
      const discountB = (b.fullPrice || 0) - b.price;

      return discountB - discountA;
    });

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new"
        products={brandNewProducts}
        hasDiscount={false}
      />

      <Categories
        phonesCount={phonesCount}
        tabletsCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      />

      <ProductsSlider title="Hot prices" products={hotPricesProducts} />
    </div>
  );
};
