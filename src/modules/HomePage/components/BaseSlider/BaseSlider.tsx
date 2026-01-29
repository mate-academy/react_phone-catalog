import React, { useEffect, useRef, useState } from 'react';
import { ProductCart } from '../../../shared/components/ProductCart';
import cn from 'classnames';
import { debounce } from 'lodash';
import { Icon } from '../../../shared/components/Icon';

interface Props {
  products: Product[];
  title?: string;
  discount?: boolean;
}

export const BaseSlider: React.FC<Props> = ({ products, title }) => {
  const slider = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState(0);
  const cartElement = useRef<HTMLDivElement>(null);

  const moveRight = () => {
    setActiveModel(cur => {
      if (cur === products.length - 1) {
        return 0;
      }

      return cur + 1;
    });
  };

  const moveLeft = () => {
    setActiveModel(cur => {
      if (cur === 0) {
        return products.length - 1;
      }

      return cur - 1;
    });
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      if (slider.current && cartElement.current) {
        slider.current.style.translate = `${(cartElement.current.getBoundingClientRect().width + 16) * -activeModel}px`;
      }
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [activeModel, cartElement, slider]);

  useEffect(() => {
    if (slider.current && cartElement.current) {
      slider.current.style.translate = `${(cartElement.current.getBoundingClientRect().width + 16) * -activeModel}px`;
    }
  }, [slider, activeModel, cartElement]);

  return (
    <div className="baseSlider">
      <div className="baseSlider__top">
        {title && <h2 className="baseSlider__title">{title}</h2>}
        <div className="baseSlider__buttons">
          <button
            className={cn(
              'button',
              'baseSlider__button',
              'baseSlider__button--left',
            )}
            onClick={moveLeft}
            disabled={activeModel === 0}
          >
            <Icon iconSlug="ChevronLeft" />
          </button>
          <button
            className={cn(
              'button',
              'baseSlider__button',
              'baseSlider__button--right',
            )}
            onClick={moveRight}
          >
            <Icon iconSlug="ChevronRight" />
          </button>
        </div>
      </div>
      <div className="baseSlider__phonesContainer" ref={slider}>
        {products.map((phone, i) => {
          return (
            <ProductCart
              key={i}
              product={phone}
              prevPrice={phone.fullPrice}
              currentPrice={phone.price}
              additionalClass="baseSlider__phone"
              refObject={cartElement}
            />
          );
        })}
      </div>
    </div>
  );
};
