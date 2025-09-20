import './NewModels.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../../../src/types/Product';
import { useRef } from 'react';
import { getAssetUrl } from '../../../utils/functions/function';

type Props = {
  products: Product[];
};

export const NewModels: React.FC<Props> = ({ products }) => {
  const newProducts = [...(products || [])].sort((a, b) => b.year - a.year);

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
    <div className="new">
      <div className="new__title">
        <div className="new__title--text">Brand new models</div>
        <div className="new__title--arrows">
          <div
            className="new__title--arrows-arrow"
            onClick={() => scroll('left')}
          >
            <img src={getAssetUrl('/img/arrow-right.png')} alt="left" />
          </div>
          <div
            className="new__title--arrows-arrow arrow-active"
            onClick={() => scroll('right')}
          >
            <img src={getAssetUrl('/img/arrow-right.png')} alt="right" />
          </div>
        </div>
      </div>
      <div className="new__phones" ref={containerRef}>
        {newProducts.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};
