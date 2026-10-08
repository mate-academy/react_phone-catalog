import { useEffect, useRef, useState } from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  title?: string;
  type?: 'hot' | 'newest';
};

export const ProductsSlider = ({ title, type = 'hot' }: Props) => {
  const { t } = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        let selectedProducts: Product[];

        if (type === 'hot') {
          selectedProducts = data
            .filter(product => product.fullPrice > product.price)
            .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
        } else {
          selectedProducts = [...data].sort((a, b) => b.year - a.year);
        }

        setProducts(selectedProducts.slice(0, 8));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -260,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 260,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{t('somethingWentWrong')}</p>;
  }

  const translatedTitle =
    title || (type === 'hot' ? t('hotPrices') : t('newestProducts'));

  return (
    <section className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{translatedTitle}</h2>

        <div className="products-slider__buttons">
          <button type="button" onClick={scrollLeft} aria-label={t('prev')}>
            &#8249;
          </button>

          <button type="button" onClick={scrollRight} aria-label={t('next')}>
            &#8250;
          </button>
        </div>
      </div>

      <div className="products-slider__container" ref={sliderRef}>
        {products.map(product => (
          <div className="products-slider__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
