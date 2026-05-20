import { Products } from '../../types/Products';
import '../DevSpec/PhoneSpec.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  products: Products[];
  currentSlide: number;
  visibleCount: number;
};

export const ProductSpecs: React.FC<Props> = ({
  products,
  currentSlide,
  visibleCount,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [cardStep, setCardStep] = useState(0);
  const gap = 24;

  useEffect(() => {
    const updateCardStep = () => {
      const track = trackRef.current;
      const card = track?.querySelector<HTMLAnchorElement>('.products-phone');

      if (!card) {
        setCardStep(0);
        return;
      }

      setCardStep(card.offsetWidth + gap);
    };

    updateCardStep();
    window.addEventListener('resize', updateCardStep);

    return () => window.removeEventListener('resize', updateCardStep);
  }, [products.length, visibleCount]);

  return (
    <div className="products-phones">
      <div
        ref={trackRef}
        className="products-track"
        style={{ transform: `translateX(-${currentSlide * cardStep}px)` }}
      >
        {products.map(product => (
          <Link
            key={product.id}
            to={`phones/${product.id}`}
            className="products-phone"
            style={{
              minWidth: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
            }}
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
    </div>
  );
};
