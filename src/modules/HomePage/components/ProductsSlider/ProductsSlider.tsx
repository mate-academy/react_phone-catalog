import { useEffect, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../../shared/interfaces/Product';
import { ProductCard } from '../../../../components/ProductCard';
import { Icon } from '../../../../components/Icon/Icon';

interface Props {
  type: 'new' | 'hot';
}

const VISIBLE_COUNT = 4;

export const ProductsSlider = ({ type }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      });
  }, []);

  const preparedProducts = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => {
      if (type === 'new') {
        return b.year - a.year;
      }

      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  const visibleProducts = preparedProducts.slice(
    startIndex,
    startIndex + VISIBLE_COUNT,
  );

  const handleNext = () => {
    setStartIndex(prev =>
      prev + VISIBLE_COUNT >= preparedProducts.length ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setStartIndex(prev =>
      prev === 0
        ? Math.max(preparedProducts.length - VISIBLE_COUNT, 0)
        : prev - 1,
    );
  };

  if (!preparedProducts.length) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {type === 'new' ? 'Brand new models' : 'Hot prices'}
        </h2>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous products"
          >
            <Icon name="arrow-left" className={styles.arrowIcon} />
          </button>

          <button type="button" onClick={handleNext} aria-label="Next products">
            <Icon name="arrow-right" className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.slider}>
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
          />
        ))}
      </div>
    </section>
  );
};
