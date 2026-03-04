import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Card/ProductCard';
import styles from './ProductSlider.module.scss';
import arrowRight from '../../items/vector_right.png';
import arrowLeft from '../../items/vector_left.png';

interface Product {
  id: string;
  itemId: string;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface Props {
  title: string;
  products: Product[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;

  const visibleProducts = products.slice(index, index + visibleCount);

  const handleNext = () => {
    if (index < products.length - visibleCount) {
      setIndex(current => current + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(current => current - 1);
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.btn_left}
              onClick={handlePrev}
              disabled={index === 0}
            >
              <img className={styles.btn_icon} src={arrowLeft} alt="Prev" />
            </button>

            <button
              type="button"
              className={styles.btn_right}
              onClick={handleNext}
              disabled={index >= products.length - visibleCount}
            >
              <img className={styles.btn_icon} src={arrowRight} alt="Next" />
            </button>
          </div>
        </div>

        <div className={styles.container}>
          {visibleProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.itemId}`}
              className={styles.card_link}
            >
              <ProductCard
                id={product.itemId} // ← було product.id
                image={product.image}
                name={product.name}
                price={product.price}
                fullPrice={product.fullPrice}
                screen={product.screen}
                capacity={product.capacity}
                ram={product.ram}
                hasDiscount={title !== 'Brand new models'}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
