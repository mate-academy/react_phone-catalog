import { useState } from 'react';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  goods: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ goods, title }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productsPerPage = 4;
  const totalProducts = goods.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
    }
  };

  const startIndex = currentIndex * productsPerPage;
  const currentProducts = goods.slice(startIndex, startIndex + productsPerPage);

  return (
      <section className={`${styles.section} ${styles.sectionSection}`}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>{title}</h2>
          <div className={styles.slider}>
            <button onClick={prevPage}
              className={`${styles.slider__button} ${styles.buttonPrev}`}
              disabled={currentIndex === 0}>
              <img src={strokeLeft} alt="Previous" className={styles.slider__iconPrev}/>
            </button>
            <button onClick={nextPage}
              className={`${styles.slider__button} ${styles.buttonNext}`}
              disabled={currentIndex >= totalPages - 1 }>
              <img src={strokeRight} alt="Next" className={styles.slider__iconNext}/>
            </button>
          </div>
        </div>

        <section className={styles.products}>
          <div className={`${styles.products__list} ${styles.productGrid}`}>
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>
      </section>
  );
};
