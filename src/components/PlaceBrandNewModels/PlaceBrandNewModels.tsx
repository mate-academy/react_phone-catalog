import { useRef } from 'react';
import styles from './PlaceBrandNewModels.module.scss';
import { productsInfo } from '../../data/productsData';
import { ProductCard } from '../ProductCard/ProductCard';

export const PlaceBrandNewModels = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inicio_sessao}>
        <h1 className={styles.title_sessao}>Brand new models</h1>

        <div className={styles.container_button}>
          <button className={styles.arrow} onClick={scrollLeft}>
            <img
              src="src\Icons\rigthArrowBlack.svg"
              alt="left"
              className={styles.arrow_icon}
            />
          </button>
          <button className={styles.arrow} onClick={scrollRight}>
            <img
              src="src/Icons/lefthArrowBlack.svg"
              alt="right"
              className={styles.arrow_icon}
            />
          </button>
        </div>
      </div>

      <div className={styles.product_cards_container} ref={carouselRef}>
        {productsInfo.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
