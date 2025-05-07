import React, { useEffect, useState } from 'react';
import { ArrowType, Products, SortType } from '../../utils/types';
import { fetchProducts } from '../../utils/fetch';
import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';
import { Title } from '../Title';
import { ArrowButton } from '../ArrowButton';

type Props = {
  title: string;
  category: string;
  sortBy: SortType;
};

export const ProductSlider: React.FC<Props> = ({ title, category, sortBy }) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState<Products[]>([]);
  const [leftImageIndex, setLeftImageIndex] = useState(0);

  const SLIDER_GAP = 16;
  const widthToSlide =
    leftImageIndex === 0 ? 0 : leftImageIndex * (cardWidth + SLIDER_GAP);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 320 && window.innerWidth < 640) {
        setCardWidth(212);
      } else if (window.innerWidth >= 640 && window.innerWidth < 1200) {
        setCardWidth(237);
      } else if (window.innerWidth >= 1200) {
        setCardWidth(272);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchProducts(category, sortBy).then(result => {
      setDisplayedProducts(result);
    });
  }, [category, sortBy]);

  const handleNextClick = () => {
    setLeftImageIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setLeftImageIndex(prevIndex => prevIndex - 1);
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.productSlider__top}>
        <Title level={2}>{title}</Title>
        <div className={styles.productSlider__buttons}>
          <ArrowButton
            type={ArrowType.left}
            disabled={leftImageIndex === 0}
            onClick={handlePrevClick}
          />
          <ArrowButton
            type={ArrowType.right}
            onClick={handleNextClick}
            disabled={leftImageIndex >= displayedProducts.length - 1}
          />
        </div>
      </div>
      <div className={styles.productSlider__outerwrapper}>
        <div
          className={styles.productSlider__innerwrapper}
          style={{ transform: `translateX(-${widthToSlide}px)` }}
        >
          {displayedProducts?.map(displayedProduct => (
            <ProductCard
              key={displayedProduct.id}
              product={displayedProduct}
              width={cardWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
