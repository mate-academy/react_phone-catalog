import React, { useEffect, useRef, useState } from 'react';
import './ProductsList.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import { ButtonScroll } from '../ButtonScroll';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsList: React.FC<Props> = ({ products, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const scrollAmount = 272 + 16;

  const updateButtons = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setIsLeftDisabled(scrollLeft <= 0);
    setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateButtons();

    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', updateButtons);
      window.addEventListener('resize', updateButtons); // щоб кнопки коректно оновлювались при зміні ширини
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateButtons);
        window.removeEventListener('resize', updateButtons);
      }
    };
  }, []);

  return (
    <>
      <div className="header-row">
        <h2>{title}</h2>
        <div className="arrow">
          <ButtonScroll
            buttonText="/img/icons/arrow-left.svg"
            clickFunc={scrollLeft}
            disabled={isLeftDisabled}
          />

          <ButtonScroll
            buttonText="/img/icons/arrow-right.svg"
            clickFunc={scrollRight}
            disabled={isRightDisabled}
          />
        </div>
      </div>
      <div className="products-list" ref={containerRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
