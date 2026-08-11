import React, { useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard'; 

interface Props {
     title :string ;
     products : Product[];
}

const CARD_WIDTH = 272;
const GAP = 16 ;
const STEP = CARD_WIDTH + GAP;
const VISIBLE_CARDS = 4;

export const ProductsSlider :React.FC<Props> =({title ,products}) => {
   // Стан: індекс першої видимої картки (починаємо з 0)
  const [currentIndex, setCurrentIndex] = useState(0);
 

  // Максимальний індекс, далі якого стрічка не має їхати
  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  // Функція для кліку назад 
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  // Функція для кліку вперед 
 const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

   const translateX = currentIndex * STEP;


     return (
    // Блок
    <div className={styles['products-slider']}>
      
      {/* Елемент: Шапка (Заголовок + Кнопки) */}
      <div className={styles['products-slider__header']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>
        
        {/* Контейнер кнопок */}
        <div className={styles['products-slider__buttons']}>
          <button 
            type="button" 
            className={styles['products-slider__button']}
            onClick={handlePrev}
            disabled={currentIndex === 0} // Кнопка згасне, якщо ми на початку
          >
            <img src="/react_phone-catalog/img/icons/arrow-left.svg" alt="Previous" className={styles['products-slider__arrow']} />
          </button>
          
          <button 
            type="button" 
            className={styles['products-slider__button']}
            onClick={handleNext}
            disabled={currentIndex === maxIndex} // Кнопка згасне, якщо дійшли до кінця
          >
            <img src="/react_phone-catalog/img/icons/arrow-right.svg" alt="Next" className={styles['products-slider__arrow']} />
          </button>
        </div>
      </div>

      {/* Елемент: Вікно, яке обрізає все, що вилазить за межі екрану */}
      <div className={styles['products-slider__frame']}>
        
        {/* Елемент: Стрічка, яку рухає React через inline-стиль transform */}
        <div 
          className={styles['products-slider__track']}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map((product) => (
            // Твоя реальна картка товару!
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </div>
  );

}

