import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { useDebounce } from '../../utils/hooks/useDebounce';

type Props = {
  products: (Product | null)[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [listScrollLeftValue, setListScrollLeftValue] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [arrowsNeeded, setArrowsNeeded] = useState(false);

  const scrolledWithButtonRef = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);

  if (listRef.current) {
    listRef.current.scrollLeft = listScrollLeftValue;
  }

  const checkIfScrollNeeded = () => {
    const listShownWidth = listRef.current?.clientWidth ?? 0;
    const listFullWidth = listRef.current?.scrollWidth ?? 0;

    if (listFullWidth > listShownWidth) {
      return true;
    }

    return false;
  };

  const resizeHandlerDebounced = useDebounce(() => {
    setArrowsNeeded(checkIfScrollNeeded());
  });

  useEffect(() => {
    const onResize = () => {
      resizeHandlerDebounced();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setArrowsNeeded(checkIfScrollNeeded());
  }, [products]);

  const checkIfScrollAvailable = () => {
    const currentScroll = listRef.current?.scrollLeft ?? 0;
    const listWidth = listRef.current?.scrollWidth ?? 0;
    const listShownWidth = listRef.current?.clientWidth ?? 0;
    const listScrollAvailable = listWidth - listShownWidth;

    if (currentScroll === 0) {
      setCanScrollPrev(false);
    } else {
      setCanScrollPrev(true);
    }

    if (listScrollAvailable === currentScroll) {
      setCanScrollNext(false);
    } else {
      setCanScrollNext(true);
    }
  };

  const shiftNext = () => {
    scrolledWithButtonRef.current = true;
    setCanScrollPrev(true);
    const currentScroll = listRef.current?.scrollLeft ?? 0;
    const listWidth = listRef.current?.scrollWidth ?? 0;
    const listShownWidth = listRef.current?.clientWidth ?? 0;
    const listScrollAvailable = listWidth - listShownWidth;
    const listElement = listRef.current?.firstChild as HTMLLIElement;
    const listElementWidth = listElement.offsetWidth ?? 0;

    const newScroll =
      currentScroll + listElementWidth <= listScrollAvailable
        ? currentScroll + listElementWidth
        : listScrollAvailable;

    setListScrollLeftValue(newScroll);

    if (newScroll === listScrollAvailable) {
      setCanScrollNext(false);
    }
  };

  const shiftPrev = () => {
    scrolledWithButtonRef.current = true;
    setCanScrollNext(true);
    const currentScroll = listRef.current?.scrollLeft ?? 0;
    const listElement = listRef.current?.firstChild as HTMLLIElement;
    const listElementWidth = listElement.offsetWidth ?? 0;

    const newScroll =
      currentScroll - listElementWidth >= listElementWidth
        ? currentScroll - listElementWidth
        : 0;

    setListScrollLeftValue(newScroll);

    if (newScroll === 0) {
      setCanScrollPrev(false);
    }
  };

  const scrollHandlerDebounced = useDebounce(() => {
    if (scrolledWithButtonRef.current) {
      scrolledWithButtonRef.current = false;

      return;
    }

    setListScrollLeftValue(listRef.current?.scrollLeft ?? 0);
    checkIfScrollAvailable();
  }, 100);

  return (
    <section className="product-slider">
      <div className="product-slider__heading">
        <h2 className="product-slider__title">{title}</h2>

        {arrowsNeeded && (
          <div className="product-slider__buttons">
            <button
              className={classNames(
                'product-slider__button',
                'product-slider__button--direction--prev',
                { disabled: !canScrollPrev },
              )}
              onClick={shiftPrev}
            ></button>

            <button
              className={classNames(
                'product-slider__button',
                'product-slider__button--direction--next',
                { disabled: !canScrollNext },
              )}
              onClick={shiftNext}
            ></button>
          </div>
        )}
      </div>

      <div className="product-slider__list-wrapper">
        <ul
          className="product-slider__list"
          onScroll={() => {
            scrollHandlerDebounced();
          }}
          ref={listRef}
        >
          {products.map((product, index) => (
            <li
              className="product-slider__item"
              key={product ? product.id : index}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
