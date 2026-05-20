import { Discounted } from '../../types/Discounted';
import { ProductCard } from '../ProductCard/ProductCard';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  DiscountedProducts: Discounted[];
  visibleCount: number;
};

export const Discount: React.FC<Props> = ({
  DiscountedProducts,
  visibleCount,
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 24;

  useEffect(() => {
    const updateCardWidth = () => {
      if (!viewportRef.current) {
        return;
      }

      const width = viewportRef.current.offsetWidth;
      const count = Math.max(1, visibleCount);

      setCardWidth((width - gap * (count - 1)) / count);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, [visibleCount]);

  return (
    <div className="products-phones">
      {DiscountedProducts.map(product => (
        <Link
          key={product.id}
          to={`phones/${product.id}`}
          className="products-phone"
          style={
            cardWidth
              ? { minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }
              : {}
          }
        >
          <div className="products-container">
            <div className="products_">
              <div className="products-img">
                <img src={product.image} alt="" className="products-image" />
              </div>
              <p className="products-title">{product.name}</p>
              <span className="products-price">${product.fullPrice}</span>
            </div>
            <div className="products__bottom">
              <div className="products-string"></div>
              <div className="products-info">
                <p className="products-text products-text__first">
                  Screen <span className="products-span">{product.screen}</span>
                </p>
                <p className="products-text">
                  Capacity{' '}
                  <span className="products-span">{product.capacity}</span>
                </p>
                <p className="products-text">
                  RAM <span className="products-span">{product.ram}</span>
                </p>
              </div>
              <ProductCard product={product} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
