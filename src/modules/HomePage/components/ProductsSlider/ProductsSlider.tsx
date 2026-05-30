import { useEffect, useState, useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../../shared/interfaces/Product';
import { ProductCard } from '../../../../components/ProductCard';
import { Icon } from '../../../../components/Icon/Icon';

interface Props {
  type: 'new' | 'hot';
  title: string;
}

export const ProductsSlider = ({ type, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load products.json');
        }

        return res.json();
      })
      .then((data: Product[]) => {
        const phones = data.filter(p => p.category === 'phones');

        const discount = (p: Product) => (p.fullPrice ?? 0) - (p.price ?? 0);

        const sorted =
          type === 'new'
            ? [...phones].sort((a, b) => b.year - a.year)
            : [...phones].sort((a, b) => discount(b) - discount(a));

        setProducts(sorted.slice(0, 16));
      });
  }, [type]);

  const scrollNext = () => {
    sliderRef.current?.scrollBy({
      left: 288,
      behavior: 'smooth',
    });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({
      left: -288,
      behavior: 'smooth',
    });
  };

  const preparedProducts = [...products]
    .filter(product => product.category === 'phones')
    .sort((a, b) => {
      if (type === 'new') {
        return b.year - a.year;
      }

      return b.fullPrice - b.price - (a.fullPrice - a.price);
    });

  if (!products.length) {
    return (
      <section className={styles.wrapper}>
        <div className="container">
          <div className={styles.loader}>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous products"
          >
            <Icon name="arrow-left" className={styles.arrowIcon} />
          </button>

          <button type="button" onClick={scrollNext} aria-label="Next products">
            <Icon name="arrow-right" className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.products} ref={sliderRef}>
        {preparedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showOldPrice={type === 'hot'}
          />
        ))}
      </div>
    </div>
  );
};
