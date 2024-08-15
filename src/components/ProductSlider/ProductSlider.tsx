import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone } from '../../types/Product';
import styles from './ProductSlider.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';

type ProductSliderProps = {
  title: string;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({ title }) => {
  const [products, setProducts] = useState<ProductPhone[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/phones.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const displayedItems = products.slice(-10); // SIMPLIFICATION - MUST BE BASED ON SORTING - WILL BE UPDATED
  console.log('product slider items', displayedItems);

  return (
    <div className={styles.productSlider}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.arrowButton}>
            <img src={ChevronIcon} alt="scroll right" />
          </button>

          <button className={styles.arrowButton}>
            <img src={ChevronIcon} alt="scroll right" className={styles.iconNext} />
          </button>
        </div>
      </div>

      <div className={styles.topContainer}>
        <div className={styles.sliderContainer}>
          <div>
            <ul className={styles.slideWraper}>
              {displayedItems.map((product) => (
                <li key={product.id} className={styles.productCard}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
