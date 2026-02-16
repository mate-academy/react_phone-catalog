import { useEffect, useRef, useState } from 'react';
import { getApi } from '../../shared/api/api';
import type { ProductPage } from '../../shared/types/ProductPage';
import { PictureSlider } from '../../shared/components/PictureSlider';
import { Cards } from './components/Cards';
import { Category } from './components/Category';
import { CatObj } from './types/CatObj';

import './HomePage.scss';
import { LoaderCards } from '../../shared/components/LoaderCards';

export const HomePage = () => {
  const [products, setProducts] = useState<ProductPage[]>([]);
  const [categories, setCategories] = useState<CatObj[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const images: string[] = [
    'img/home/slider/banner0.jpg',
    'img/home/slider/banner3.png',
    'img/home/slider/banner2.jpg',
  ];

  useEffect(() => {
    getApi('/products.json')
      .then(products => {
        setProducts(products);
        const category = [...new Set(products.map(item => item.category))];
        const categoryObj = category.map(item => ({ label: item }));

        setCategories(categoryObj);
      })
      .catch(error => {
        setError('Something went wrong');
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const getHotPrices = () => {
    return products.sort((a: ProductPage, b: ProductPage) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
  };

  const categoryCount = products.reduce((acc, product) => {
    const category: string = product.category;

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  return (
    <>
      <section className="main-content">
        <div className="top-content grid">
          <h1 className="top-content-title">Product Catalog</h1>
        </div>
        <PictureSlider
          imgs={images}
          start={touchStart}
          end={touchEnd}
          onAnimated={setIsAnimating}
          ShowDotsImg={false}
        />
        {loading && <LoaderCards />}
        {!loading && (
          <Cards
            title={'Brand new  models'}
            items={getHotPrices()}
            isFullPrice={false}
          />
        )}
        {error !== '' && <p className="error">{error}</p>}
        {loading && <LoaderCards />}

        {!loading && <Category filtredCategory={categoryCount} />}
        {loading && <LoaderCards />}
        {error !== '' && <p className="error">{error}</p>}
        {!loading && (
          <Cards title={'Hot prices'} items={products} isFullPrice={true} />
        )}
        {error !== '' && <p className="error">{error}</p>}
      </section>
    </>
  );
};
