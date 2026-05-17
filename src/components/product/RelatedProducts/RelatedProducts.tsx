import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getProducts } from '@api/products';
import { Product } from '@/types/Product';
import { sortByBestPrice } from '@utils/productFilters';
import './RelatedProducts.scss';
import { ProductCard } from '../ProductCard';

interface Props {
  category: string | undefined;
  currentProductId: string | undefined;
}

export const RelatedProducts: React.FC<Props> = ({
  category,
  currentProductId,
}) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!category) return;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const allProducts = await getProducts();

        const categoryProducts = allProducts.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase().includes(category.toLowerCase()),
        );

        setProducts(categoryProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const recommendedProducts = useMemo(() => {
    if (!products.length) return [];

    const filtered = products.filter((p) => {
      const pId = String(p.itemId || p.id);
      const currentId = String(currentProductId);
      return pId !== currentId;
    });

    return sortByBestPrice(filtered).slice(0, 12);
  }, [products, currentProductId]);

  const checkScrollPosition = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    checkScrollPosition();
  }, [recommendedProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -288 : 288,
      behavior: 'smooth',
    });
  };

  if (isLoading) return null;
  if (!recommendedProducts.length) return null;

  return (
    <div className="AlsoLike">
      <div className="AlsoLike__header">
        <h3 className="AlsoLike__title">{t('product_details.recommend')}</h3>

        <div className="AlsoLike__arrows">
          <button
            className="AlsoLike__arrow-btn AlsoLike__arrow-btn--left"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous"
          />

          <button
            className="AlsoLike__arrow-btn AlsoLike__arrow-btn--right"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next"
          />
        </div>
      </div>

      <div
        className="AlsoLike__slider"
        ref={sliderRef}
        onScroll={checkScrollPosition}
      >
        <div className="AlsoLike__track">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
