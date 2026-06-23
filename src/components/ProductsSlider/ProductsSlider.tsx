import React, { useEffect, useRef, useState } from 'react';
import { ProductsSliderCard } from '../ProductsSliderCard/ProductsSliderCard';
import { ProductDetails } from '../../types/ProductDetails';
import { useTranslation } from 'react-i18next';

type Props = {
  products: ProductDetails[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const { t } = useTranslation();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;

    checkScroll();

    if (element) {
      element.addEventListener('scroll', checkScroll);
      window.addEventListener('scroll', checkScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', checkScroll);
      }

      window.removeEventListener('scroll', checkScroll);
    };
  }, [products]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__arrows">
          <button
            className="products-slider__arrow products-slider__arrow-left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          />
          <button
            className="products-slider__arrow products-slider__arrow-right"
            onClick={scrollRight}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      <div className="products-slider__list" ref={scrollRef}>
        {products.map(product => {
          if (title === t('new-models')) {
            const mappedProduct = {
              id: 0,
              itemId: product.id,
              category: product.category as
                | 'phones'
                | 'tablets'
                | 'accessories',
              name: product.name,
              fullPrice: product.priceRegular,
              price: product.priceRegular,
              screen: product.screen,
              capacity: product.capacity,
              color: product.color,
              ram: product.ram,
              year: 2020,
              image: product.images[0],
            };

            return (
              <ProductsSliderCard key={product.id} product={mappedProduct} />
            );
          } else {
            const mappedProduct = {
              id: 0,
              itemId: product.id,
              category: product.category as
                | 'phones'
                | 'tablets'
                | 'accessories',
              name: product.name,
              fullPrice: product.priceRegular,
              price: product.priceDiscount,
              screen: product.screen,
              capacity: product.capacity,
              color: product.color,
              ram: product.ram,
              year: 2020,
              image: product.images[0],
            };

            return (
              <ProductsSliderCard key={product.id} product={mappedProduct} />
            );
          }
        })}
      </div>
    </div>
  );
};
