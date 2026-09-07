import React, { useEffect, useRef, useState } from 'react';
import style from './ProductList.module.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ButtonScroll } from '../ButtonScroll/ButtonScroll';

type Props = {
  products: Product[];
  title: string;
};

export const ProductList: React.FC<Props> = ({ products, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLeftDisable, setIsLeftDisable] = useState(true);
  const [isRightDisable, setIsRightDisable] = useState(false);

  const scrollGap = 16;
  const itemMinWidth = 272;

  const scrollContainerLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollContainerRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleResize = () => {
    if (!containerRef.current) {
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;

    const maxItems =
      Math.floor((containerWidth + scrollGap) / (itemMinWidth + scrollGap)) ||
      1;

    const itemWidth = (containerWidth - scrollGap * (maxItems - 1)) / maxItems;

    Array.from(containerRef.current.children).forEach(child => {
      const el = child as HTMLElement;

      el.style.width = `${itemWidth}px`;
      el.style.flex = `0 0 ${itemWidth}px`;
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  useEffect(() => {
    const contsiner = containerRef.current;

    if (!contsiner) {
      return;
    }

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = contsiner;

      setIsLeftDisable(scrollLeft <= 0);
      setIsRightDisable(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    contsiner.addEventListener('scroll', update);

    return () => contsiner.removeEventListener('scroll', update);
  }, [products]);

  return (
    <>
      <div className={style['header-row']}>
        <h2>{title}</h2>
        <div className={style.arrow}>
          <ButtonScroll
            buttonText="img/icons/Chevron (Arrow Left).svg"
            clickFunc={scrollContainerLeft}
            disabled={isLeftDisable}
          />
          <ButtonScroll
            buttonText="img/icons/Chevron (Arrow Right).svg"
            clickFunc={scrollContainerRight}
            disabled={isRightDisable}
          />
        </div>
      </div>

      <div className={style['products-list']} ref={containerRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
