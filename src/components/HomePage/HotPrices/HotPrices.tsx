import './HotPrices.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../../../src/types/Product';
import { useRef } from 'react';

type Props = {
  products: Product[];
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  const hotProducts = [...(products || [])].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const card = container.querySelector<HTMLDivElement>('.phone');

    if (!card) {
      return;
    }

    const cardWidth = card.offsetWidth + 16;
    const scrollAmount = direction === 'right' ? cardWidth : -cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="hot">
      <div className="hot__title">
        <div className="hot__title--text">Hot prices</div>
        <div className="hot__title--arrows">
          <div
            className={`hot__title--arrows-arrow`}
            onClick={() => scroll('left')}
          >
            <img src="../../img/arrow-left.png" alt="left" />
          </div>
          <div
            className={`hot__title--arrows-arrow arrow-active`}
            onClick={() => scroll('right')}
          >
            <img src="../../img/arrow-right.png" alt="right" />
          </div>
        </div>
      </div>
      <div className="hot__phones" ref={containerRef}>
        {hotProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
