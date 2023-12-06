/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Item } from '../../types/Item';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';
import { Title } from '../Title';

type Props = {
  title: string;
  items: Item[];
};

const SLIDE_WIDTH = parseInt(getComputedStyle(document.documentElement)
  .getPropertyValue('--product-width'), 10);
const SLIDES_GAP = parseInt(getComputedStyle(document.documentElement)
  .getPropertyValue('--products-slider-gap'), 10);

export const ProductSlider: React.FC<Props> = ({ title, items }) => {
  const [position, setPosition] = useState(0);
  const [isCurrentItemLast, setIsCurrentItemLast] = useState(false);
  const [isCurrentItemFirst, setIsCurrentItemFirst] = useState(true);
  const lastItem = useRef<HTMLLIElement>(null);
  const firstItem = useRef<HTMLLIElement>(null);

  const getRefForSLide = useCallback((index: number) => {
    if (index === 0) {
      return firstItem;
    }

    if (index === items.length - 1) {
      return lastItem;
    }

    return null;
  }, [items]);

  useEffect(() => {
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCurrentItemFirst(entry.isIntersecting);
      },
      { threshold: 0.00001 },
    );

    const lastObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCurrentItemLast(entry.isIntersecting);
      },
      { threshold: 0.00001 },
    );

    if (firstItem.current) {
      firstObserver.observe(firstItem.current);
    }

    if (lastItem.current) {
      lastObserver.observe(lastItem.current);
    }

    return () => {
      if (firstItem.current) {
        firstObserver.unobserve(firstItem.current);
      }

      if (lastItem.current) {
        lastObserver.unobserve(lastItem.current);
      }
    };
  }, [position]);

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <Title title={title} />
        <div className="products-slider__header-controls">
          <button
            type="button"
            disabled={isCurrentItemFirst}
            className="simple-button slider-left"
            onClick={() => setPosition(position - 1)}
          />
          <button
            type="button"
            disabled={isCurrentItemLast}
            className="simple-button slider-right"
            onClick={() => setPosition(position + 1)}
          />
        </div>
      </div>
      <div
        className="products-slider__content"
      >
        <ul
          className="products-slider__list"
          style={{
            transform: `translateX(-${position * (SLIDE_WIDTH + SLIDES_GAP)}px)`,
          }}
        >
          {items.map((item, index) => (
            <li
              ref={getRefForSLide(index)}
              key={item.id}
              className="products-slider__item"
            >
              <ProductCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
