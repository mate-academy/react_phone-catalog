import { useState, useRef } from 'react';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { ProductCard } from '../ProductCard';
import './block.scss';

type Props = {
  sectionTitle: string;
  products: Product[];
};

export const ProductBlock: React.FC<Props> = ({ sectionTitle, products }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const slideStep = 288;

  const slideNext = () => {
    if (currIndex === products.length - 4) {
      return;
    }

    const nextIndex = (currIndex + 1) % (products.length - 3);

    setCurrIndex(nextIndex);

    if (wrapper.current) {
      wrapper.current.style.transform = `translateX(-${nextIndex * slideStep}px)`;
    }
  };

  const slidePrev = () => {
    if (currIndex === 0) {
      return;
    }

    const prevIndex = (currIndex - 1 + products.length) % (products.length);

    setCurrIndex(prevIndex);

    if (wrapper.current) {
      wrapper.current.style.transform = `translateX(-${prevIndex * slideStep}px)`;
    }
  };

  return (
    <div className="block">
      <div className="block__header">
        <h2 className="block__title">
          {sectionTitle}
        </h2>

        <div className="block__buttons">
          <Button
            width="32px"
            height="32px"
            handler={slidePrev}
            disabled={currIndex === 0}
          >
            <img src="./img/icons/arrowLeft.svg" alt="prev" />
          </Button>

          <Button
            width="32px"
            height="32px"
            handler={slideNext}
            disabled={currIndex === products.length - 4}
          >
            <img src="./img/icons/arrowRight.svg" alt="next" />
          </Button>
        </div>
      </div>

      <div className="block__wrapper">
        <div ref={wrapper} className="block__cards">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
