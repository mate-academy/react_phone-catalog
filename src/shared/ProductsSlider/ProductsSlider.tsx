import React, { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import CardItem from '../CardItem';
import { IProductCard } from '../../interfaces/ProductCard.interface';

interface IProductsSliderProps {
  products: IProductCard[],
  title: string,
}

const ProductsSlider: React.FC<IProductsSliderProps> = ({ products, title }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 284;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 284;
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2>{title}</h2>
        <div>
          <button onClick={slideLeft}><span>{'<'}</span></button>
          <button onClick={slideRight}><span>{'>'}</span></button>
        </div>
      </div>

      <div className={styles.slider__main}>
        <div className={styles.slider__mainItems} ref={sliderRef}>
          {products.map(product => (
            <CardItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsSlider;
