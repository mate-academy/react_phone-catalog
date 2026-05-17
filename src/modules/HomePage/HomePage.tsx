import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { BannerSlider } from './components/BanerSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopCategory } from './components/ShopCategory';
import { Product } from '../../types/Product';
import { getData } from '../../utils/getData';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<Product[]>('/products')
      .then(data => setProducts(data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  function countCategoriesCount() {
    const categoriesCounts = {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };

    return categoriesCounts;
  }

  return (
    <>
      <section className="products">
        <div className="products__content">
          <h1 className="products__header">Welcome to Nice Gadgets store!</h1>
          <BannerSlider />
          <ProductsSlider
            header={'Brand new models'}
            oldPrice={false}
            products={products
              .sort((elem1, elem2) => elem1.year - elem2.year)
              .slice(0, 10)}
          />
          <ShopCategory counts={countCategoriesCount()} />
          <ProductsSlider
            header={'Hot prices'}
            oldPrice={true}
            products={products
              .sort((elem1, elem2) => elem1.price - elem2.price)
              .slice(0, 10)}
          />
        </div>
      </section>
    </>
  );
};
